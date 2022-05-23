import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [UploadController],
  providers: [PrismaService, UploadService],
})
export class UploadModule {}
