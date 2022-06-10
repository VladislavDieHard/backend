import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.upload(file);
  }

  @Post('/exhibition')
  @UseInterceptors(FileInterceptor('file'))
  uploadExhibition(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.uploadExhibition(file);
  }

  @Post('/relisting')
  relisting(@Query('type') type: string) {
    if (type) {
      return this.uploadService.relistingFiles(type);
    } else {
      throw new HttpException('Type query is required', HttpStatus.BAD_REQUEST);
    }
  }
}
