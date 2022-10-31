import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MenuDto } from '../menu/dto/menu.dto';
import { MenuType } from '../menu/menu.types';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Document')
@Controller('document')
export class DocumentController {
  constructor(private documentService: DocumentService) {}

  @Get()
  getDocuments(
    @Query('searchByField') searchByField?: string,
    @Query('isDeleted') isDeleted?: string,
    @Query('pageSize') pageSize?: number,
    @Query('page') page?: number,
    @Query('include') include?: string,
  ) {
    return this.documentService.getDocuments({
      searchByField: searchByField,
      include: include || undefined,
      page,
      pageSize,
      isDeleted,
    });
  }

  @ApiResponse({
    status: 200,
    description: 'Возвращает одну запись модели MenuItem',
    type: MenuDto,
  })
  @ApiOperation({
    summary: 'Возвращает одну запись модели MenuItem',
  })
  @ApiQuery({
    name: 'type',
    required: false,
    description: 'Укажите тип меню, что-бы вернуть только данный тип',
    enum: MenuType,
  })
  @ApiParam({
    name: 'Id or Slug',
    type: String,
  })
  @UseGuards(JwtAuthGuard)
  @Get(':idOrSlug')
  getDocument(@Param('idOrSlug') idOrSlug: string) {
    return this.documentService.getDocument(idOrSlug);
  }

  @ApiResponse({
    status: 200,
    description: 'Добавляет запись Document',
  })
  @ApiOperation({
    summary: 'Добавляет запись Document',
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  createDocument(@Body() newDocument: any) {
    return this.documentService.createDocument(newDocument);
  }

  @ApiResponse({
    status: 200,
    description: 'Обновляет запись Document',
  })
  @ApiOperation({
    summary: 'Обновляет запись Document',
  })
  @UseGuards(JwtAuthGuard)
  @Put(':idOrSlug')
  updateDocument(
    @Body() newDocument: any,
    @Param('idOrSlug') idOrSlug: string,
  ) {
    return this.documentService.updateDocument(idOrSlug, newDocument);
  }

  @ApiResponse({
    status: 200,
    description: 'Удаляет запись Document',
  })
  @ApiOperation({
    summary: 'Удаляет запись Document',
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':idOrSlug')
  deleteDocument(@Param('idOrSlug') idOrSlug: string) {
    return this.documentService.deleteDocument(idOrSlug);
  }
}
