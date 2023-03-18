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
import { EntryService } from './entry.service';
import { Entry } from '@prisma/client';
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EntryDto } from './dto/entry.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { log } from "prisma-class-generator/dist/util";

@ApiTags('Entry')
@Controller('entry')
export class EntryController extends EntryService {
  @ApiOperation({
    summary: 'Возвращает массив записей модели Entry',
  })
  @ApiResponse({
    status: 200,
    description: 'Возвращает массив записей модели Entry',
    type: EntryDto,
    isArray: true,
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    description: `Количество возврашаемых записей на странице,
     стандартный размер страницы 10`,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Страница',
  })
  @ApiQuery({
    name: 'toDate',
    required: false,
    description: 'До какой даты',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Поиск по полям title и content',
  })
  @Get()
  getEntries(
    @Query('isDeleted') isDeleted?: string,
    @Query('fromDate') fromDate?: Date,
    @Query('toDate') toDate?: Date,
    @Query('pageSize') pageSize?: number,
    @Query('orderBy') orderBy?: string,
    @Query('search') search?: string,
    @Query('page') page?: number,
    @Query('include') include?: string,
    @Query('searchByField') searchByField?: string,
  ) {
    return this.entryGetService.getEntries({
      pageSize,
      fromDate,
      toDate,
      orderBy,
      search,
      page,
      include,
      searchByField,
      isDeleted,
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
    name: 'include',
    required: false,
    description: 'Укажите модели для включения полей в ответ',
    example: 'department,rubric',
  })
  @Get(':idOrSlug')
  getEntry(
    @Param('idOrSlug') idOrSlug: number | string,
    @Query('include') include?: string,
  ) {
    return this.entryGetService.getEntry(idOrSlug, include);
  }

  @ApiOperation({
    summary: 'Создаёт запись модели Entry',
  })
  @ApiBody({
    type: EntryDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Создаёт запись модели Entry',
    type: EntryDto,
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  createEntry(@Body() newEntry: Entry & { rubrics: string[] }) {
    return this.entryCreateService.createEntry(newEntry);
  }

  @ApiOperation({
    summary: 'Обновляет запись модели Entry',
  })
  @ApiBody({
    type: EntryDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Обновляет запись модели Entry',
    type: EntryDto,
  })
  @ApiQuery({
    name: 'id or slug',
    required: true,
    description: 'Уникальный идентификатор записи',
  })
  @UseGuards(JwtAuthGuard)
  @Put(':idOrSlug')
  updateEntry(
    @Param('idOrSlug') idOrSlug: number | string,
    @Body() newEntry: Entry & { rubrics: string[] },
  ) {
    return this.entryUpdateService.updateEntry(newEntry, idOrSlug);
  }

  @ApiOperation({
    summary: 'Удаляет запись модели Entry',
  })
  @ApiResponse({
    status: 200,
    description: 'Удаляет запись модели Entry',
    type: EntryDto,
  })
  @ApiQuery({
    name: 'id or slug',
    required: true,
    description: 'Уникальный идентификатор записи',
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':idOrSlug')
  deleteEntry(@Param('idOrSlug') idOrSlug: number | string) {
    return this.entryDeleteService.deleteEntry(idOrSlug);
  }
}
