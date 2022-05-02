import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { EntryService } from './entry.service';
import { Entry } from '@prisma/client';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EntryDto } from './dto/entry.dto';

@ApiTags('Entry')
@Controller('entry')
export class EntryController {
  constructor(private entryService: EntryService) {}

  @ApiResponse({
    status: 200,
    description: 'Возвращает массив записей модели Entry',
    type: EntryDto,
    isArray: true,
  })
  @ApiOperation({
    summary: 'Возвращает массив записей модели Entry',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Количество возврашаемых записей',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    description: 'Отступ',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Поиск по полям title и content',
  })
  @Get()
  getEntries(
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
    @Query('search') search?: string,
  ) {
    return this.entryService.getEntries({
      take: limit,
      skip: offset,
      search: search,
    });
  }

  @ApiResponse({
    status: 200,
    description: 'Возвращает запись модели Entry',
    type: EntryDto,
  })
  @ApiOperation({
    summary: 'Возвращает запись модели Entry',
  })
  @ApiQuery({
    name: 'id or slug',
    required: true,
    description: 'Уникальный идентификатор записи',
  })
  @ApiQuery({
    name: 'includes',
    required: false,
    description: 'Укажите модели для включения полей в ответ',
    example: 'department,rubric',
  })
  @Get(':idOrSlug')
  getEntry(
    @Param('idOrSlug') idOrSlug: number | string,
    @Query('includes') includes?: string,
  ) {
    return this.entryService.getEntry(idOrSlug, includes);
  }

  @ApiResponse({
    status: 200,
    description: 'Создаёт запись модели Entry',
    type: EntryDto,
  })
  @ApiOperation({
    summary: 'Создаёт запись модели Entry',
  })
  @Post()
  createEntry(@Body() newEntry: Entry) {
    return this.entryService.createEntry(newEntry);
  }

  @ApiResponse({
    status: 200,
    description: 'Обновляет запись модели Entry',
    type: EntryDto,
  })
  @ApiOperation({
    summary: 'Обновляет запись модели Entry',
  })
  @ApiQuery({
    name: 'id or slug',
    required: true,
    description: 'Уникальный идентификатор записи',
  })
  @Put(':idOrSlug')
  updateEntry(
    @Param('idOrSlug') idOrSlug: number | string,
    @Body() newEntry: Entry,
  ) {
    return this.entryService.updateEntry(newEntry, idOrSlug);
  }

  @ApiResponse({
    status: 200,
    description: 'Удаляет запись модели Entry',
    type: EntryDto,
  })
  @ApiOperation({
    summary: 'Удаляет запись модели Entry',
  })
  @ApiQuery({
    name: 'id or slug',
    required: true,
    description: 'Уникальный идентификатор записи',
  })
  @Delete(':idOrSlug')
  deleteEntry(@Param('idOrSlug') idOrSlug: number | string) {
    return this.entryService.deleteEntry(idOrSlug);
  }
}
