import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { FileService } from "./file.service";
import { File } from '@prisma/client';
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileDto } from "./dto/file.dto";

@ApiTags('file')
@Controller('file')
export class FileController extends FileService {
  @Get(':idOrSlug')
  getEntry(
    @Param('idOrSlug') idOrSlug: number | string,
    @Query('includes') includes?: string,
  ) {
    return this.fileGetService.getFile(idOrSlug);
  }
}