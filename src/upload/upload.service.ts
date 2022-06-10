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
import { rm } from 'node:fs/promises';
import { join } from 'node:path';
import { Worker } from 'worker_threads';

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
    const threadFile = join(__dirname, '..', 'threads', 'uploadExhibition.js');

    return new Promise((resolve, reject) => {
      const worker = new Worker(threadFile, {
        workerData: { bucketName: this.bucketName, file },
      });
      worker.on('message', async (data) => {
        const newFile = await this.saveToDb({
          id: data.id,
          originalName: file.originalname,
          mimeType: 'text/html',
          type: 'EXHIBITION',
          path: `/${this.bucketName}/exhibition/${data.id}/${data.fileName}/index.html`,
          createdAt: new Date(),
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

  // TODO Переделать
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
        if (type.toLowerCase() === 'exhibition') {
          // console.log(filesIntoDb, index);
          // console.log(file.name.substring(0, 48), index);
          filesIntoDb.forEach((fileIntoDb) => {
            console.log(fileIntoDb);
            if (
              !fileIntoDb.includes(
                `/${this.bucketName}/${file.name.substring(0, 48)}`,
              )
            ) {
              this.minioClient.removeObject(this.bucketName, file.name);
            }
          });
          // if (
          //   !filesIntoDb.includes(
          //     `/${this.bucketName}/${file.name.substring(0, 48)}`,
          //   )
          // ) {
          //   this.minioClient.removeObject(this.bucketName, file.name);
          // }
        } else {
          if (!filesIntoDb.includes(`/${this.bucketName}/${file.name}`)) {
            this.minioClient.removeObject(this.bucketName, file.name);
          }
        }
      });
    });
    return 'Relisted successfully';
  }
}
