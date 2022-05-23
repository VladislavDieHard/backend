import {
  HttpException,
  HttpStatus,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import * as dayjs from 'dayjs';
import { v4 } from 'uuid';
import { Client } from 'minio';
import { findFileType } from '../utils';
import { FileTypes } from '../utils/findFileType';
import bucketPolicy from '../utils/bucketPolicy';
import { PrismaService } from '../prisma.service';
import { File } from '@prisma/client';
import { getConfig } from '../utils/getConfig';
import * as extract from 'extract-zip';
import * as fs from 'fs';
import { rm, readdir, lstat } from 'node:fs/promises';
import * as path from 'path';

@Injectable()
export class UploadService implements OnModuleInit {
  constructor(private prismaService: PrismaService) {}
  private config = getConfig();
  private minioClient: Client = new Client({
    endPoint: this.config['MINIO_ENDPOINT'],
    port: this.config['MINIO_PORT'],
    useSSL: false,
    accessKey: this.config['MINIO_USER'],
    secretKey: this.config['MINIO_PASS'],
  });
  private bucketName = 'site';

  async onModuleInit() {
    const isBucketExists = await this.minioClient.bucketExists(this.bucketName);
    if (!isBucketExists) {
      await this.minioClient.makeBucket(this.bucketName);
      await this.minioClient.setBucketPolicy(
        this.bucketName,
        JSON.stringify(bucketPolicy),
      );
    }
  }

  async uploadExhibition(file) {
    const fileName = file.originalname.split('.').shift();

    fs.writeFileSync(`${__dirname}/temp/archive.zip`, file.buffer);
    await extract(`${__dirname}/temp/archive.zip`, {
      dir: `${__dirname}/temp/`,
    });
    await rm(`${__dirname}/temp/archive.zip`);

    const id = v4();
    const entries = await readDirRecursive(
      path.join(__dirname, 'temp', 'v_legend_russian_rock'),
    );

    for (const entry of entries) {
      const entryName = `exhibition/${id}${entry
        .substring(entry.indexOf('temp') + 4, entry.length)
        .replaceAll('\\', '/')}`;

      await this.minioClient.fPutObject(this.bucketName, entryName, entry);
    }

    const newFile = await this.saveToDb({
      id: id,
      originalName: file.originalname,
      mimeType: 'text/html',
      type: 'EXHIBITION',
      path: `/${this.bucketName}/exhibition/${id}/${fileName}/index.html`,
      createdAt: new Date(),
    });
    await rm(`${__dirname}/temp/${fileName}`, {
      recursive: true,
      force: true,
    });

    return newFile;
  }

  async upload(file) {
    const type = findFileType(file.mimetype);
    if (type === FileTypes.UNSUPPORTED) {
      throw new HttpException(FileTypes.UNSUPPORTED, HttpStatus.BAD_REQUEST);
    }

    const id = v4();
    const path = this.createPath(type, id, file.mimetype);
    const metadata = {
      'Content-Type': file.mimetype || '',
      'Original-Name': file.originalname,
    };

    return this.uploadToMinio(file, path, metadata)
      .then(async () => {
        return await this.saveToDb({
          id: id,
          originalName: file.originalname,
          mimeType: file.mimetype,
          type: type,
          path: `/${this.bucketName}/${path}`,
          createdAt: new Date(),
        });
      })
      .catch((err) => {
        throw new HttpException(err.meta, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  async saveToDb(newFile: File) {
    return await this.prismaService.file
      .create({
        data: { ...newFile },
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        throw new HttpException(err.meta, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  async uploadToMinio(file, path, metadata) {
    return this.minioClient
      .putObject(this.bucketName, path, file.buffer, undefined, metadata)
      .then((data) => data)
      .catch((err) => {
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  createPath(type, id, mime) {
    return `${type.toLowerCase()}/${dayjs().format('YYYY/MM/DD')}/${id}.${mime
      .split('/')
      .pop()}`;
  }

  async relistingFiles(type) {
    const filesIntoDb = (
      await this.prismaService.file.findMany({
        select: {
          path: true,
        },
        where: {
          type: type.toUpperCase(),
        },
      })
    ).map((file) => {
      return file.path;
    });
    const listObjectsStream = await this.minioClient.listObjects(
      this.bucketName,
      type.toLowerCase(),
      true,
    );
    const filesIntoMinio = [];
    listObjectsStream.on('data', (file) => {
      filesIntoMinio.push(file);
    });
    listObjectsStream.on('end', () => {
      filesIntoMinio.forEach((file) => {
        if (!filesIntoDb.includes(`/${this.bucketName}/${file.name}`)) {
          this.minioClient.removeObject(this.bucketName, file.name);
        }
      });
    });
    return 'Relisted successfully';
  }
}

// TODO на посмотреть
// function uploadDirRecursive(dir, done) {
//   let results = [];
//   fs.readdir(dir, function (err, list) {
//     if (err) return done(err);
//     let i = 0;
//     (function next() {
//       let file = list[i++];
//       if (!file) return done(null, results);
//       file = path.resolve(dir, file);
//
//       fs.stat(file, (err, stat) => {
//         if (stat && stat.isDirectory()) {
//           uploadDirRecursive(file, function (err, res) {
//             results = results.concat(res);
//             next();
//           });
//         } else {
//           results.push(file);
//           next();
//         }
//       });
//     })();
//   });
// }

async function readDirRecursive(dir) {
  let results = [];
  const entries = await readdir(dir);

  for (const entry of entries) {
    const entryPath = path.join(dir, entry);
    const entryStat = await lstat(entryPath);

    if (entryStat.isDirectory()) {
      const newEntries = await readDirRecursive(entryPath);
      results = results.concat(newEntries);
    } else {
      results.push(entryPath);
    }
  }

  return results;
}