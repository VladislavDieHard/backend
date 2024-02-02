import {
  HttpException,
  HttpStatus,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import bucketPolicy from '../utils/bucketPolicy';
import sha256 from 'sha256';
import moment from 'moment';
import { v4 } from 'uuid';
import { Client } from 'minio';
import { findFileType } from '../utils';
import { FileTypes, officeType } from '../utils/findFileType';
import { PrismaService } from '../prisma.service';
import { File } from '@prisma/client';
import { getConfig } from '../utils/getConfig';
import { rm } from 'node:fs/promises';
import { join } from 'node:path';
import { Worker } from 'worker_threads';
import slugify from 'slugify';

@Injectable()
export class UploadService implements OnModuleInit {
  constructor(private prismaService: PrismaService) { }
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
    const threadFile = join(__dirname, '..', 'threads', 'uploadExhibition.js');

    return new Promise((resolve, reject) => {
      const hash = sha256(file.buffer);
      const worker = new Worker(threadFile, {
        workerData: { bucketName: this.bucketName, file },
      });
      worker.on('message', async (data) => {
        const newFile = await this.saveToDb({
          id: data.id,
          originalName: file.originalname,
          mimeType: 'text/html',
          type: 'EXHIBITION',
          preview: `/${this.bucketName}/exhibition/${data.id}/${data.fileName}/cover.jpg`,
          path: `/${this.bucketName}/exhibition/${data.id}/${data.fileName}/index.html`,
          createdAt: new Date(),
          hash,
        });

        await rm(data.randomExactPath, {
          recursive: true,
          force: true,
        });

        resolve(newFile);
      });
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0)
          reject(new Error(`Worker stopped with exit code ${code}`));
      });
    });
  }

  async upload(file, fileName?: any) {
    const hash = sha256(file.buffer);
    const existFile = await this.prismaService.file.findFirst({
      where: {
        hash,
      },
    });

    if (existFile) {
      return existFile;
    }

    file.mimetype = officeType[file.mimetype] || file.mimetype;

    const type = findFileType(file.mimetype);
    if (type === 'exclude') return null;
    if (type === FileTypes.UNSUPPORTED) {
      throw new HttpException(FileTypes.UNSUPPORTED, HttpStatus.BAD_REQUEST);
    }

    const id = v4();
    const path = this.createPath(
      type,
      id,
      file.mimetype,
      new Date(),
    );
    const metadata = {
      'Content-Type': file.mimetype || '',
      'Original-Name': fileName.body.filename || slugify(file.originalname, {
        replacement: '-',
        remove: /\.,?!\+=\*:;/g,
        lower: true,
        strict: false,
        locale: 'ru',
        trim: true,
      }),
    };

    return this.uploadToMinio(file, path, metadata)
      .then(async () => {
        return await this.saveToDb({
          id: id,
          originalName: fileName.body.filename || file.originalname,
          mimeType: file.mimetype,
          path: `/${this.bucketName}/${path}`,
          preview: `/${this.bucketName}/${path}`,
          createdAt: new Date(),
          type: type,
          hash,
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
        console.log(err);
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

  createPath(type, id, mime, date?: Date) {
    return `${type.toLowerCase()}/${moment(date || new Date())
      .utc()
      .format('YYYY/MM/DD')}/${id}.${mime.split('/').pop()}`;
  }

  // TODO Переделать
  async relistingFiles(type) {
    const listObjectsStream = await this.minioClient.listObjects(
      this.bucketName,
      type.toLowerCase(),
      true,
    );

    listObjectsStream.on('data', (file) => {
      this.prismaService.file
        .findFirst({
          select: {
            path: true,
          },
          where: {
            path: `/site/${file.name}`,
          },
        })
        .then((dbFile) => {
          if (!dbFile) {
            this.minioClient.removeObject(this.bucketName, file.name);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    });

    listObjectsStream.on('end', () => {
      return 'Relisted successfully';
    });
  }
}
