import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileGetService } from './services/file.get';
import { PrismaService } from '../prisma.service';
import { FileController } from './file.controller';

@Module({
  providers: [FileService, FileGetService, PrismaService],
  controllers: [FileController],
  exports: [FileService, FileGetService, PrismaService],
})
export class FileModule {}
