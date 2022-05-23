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
import { type } from 'os';

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

    return this.minioClient
      .putObject(this.bucketName, path, file.buffer, undefined, metadata)
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
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
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

  createPath(type, id, mime) {
    return `${type.toLowerCase()}/${dayjs().format('YYYY/MM/DD')}/${id}.${mime
      .split('/')
      .pop()}`;
  }

  // TODO Доделать для всех типов
  async relistingFiles() {
    const filesIntoDb = (
      await this.prismaService.file.findMany({
        select: {
          path: true,
        },
        where: {
          type: 'IMAGE',
        },
      })
    ).map((file) => {
      return file.path;
    });
    const listObjectsStream = await this.minioClient.listObjects(
      this.bucketName,
      'image',
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
  }
}
