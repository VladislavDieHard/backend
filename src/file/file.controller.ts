import { Controller, Get, Param, Query } from '@nestjs/common';
import { FileService } from './file.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('File')
@Controller('file')
export class FileController extends FileService {
  @Get()
  getFiles(
    @Query('pageSize') pageSize: number,
    @Query('page') page: number,
    @Query('searchByField') searchByField?: string,
  ) {
    return this.fileGetService.getFiles({
      pageSize,
      page,
      searchByField,
    });
  }

  @Get(':idOrSlug')
  getFile(@Param('idOrSlug') idOrSlug: number | string) {
    return this.fileGetService.getFile(idOrSlug);
  }
}
