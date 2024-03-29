import { log } from 'prisma-class-generator/dist/util';
import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Upload')
@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@Req() request: Request, @UploadedFile() file: Express.Multer.File) {
    return this.uploadService.upload(file, request);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/exhibition')
  @UseInterceptors(FileInterceptor('file'))
  uploadExhibition(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.uploadExhibition(file);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/relisting')
  relisting(@Query('type') type: string) {
    if (type) {
      return this.uploadService.relistingFiles(type);
    } else {
      throw new HttpException('Type query is required', HttpStatus.BAD_REQUEST);
    }
  }
}
