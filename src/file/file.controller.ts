import { Controller, Get, Param } from '@nestjs/common';
import { FileService } from './file.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('File')
@Controller('file')
export class FileController extends FileService {
  @Get(':idOrSlug')
  getEntry(@Param('idOrSlug') idOrSlug: number | string) {
    return this.fileGetService.getFile(idOrSlug);
  }
}
