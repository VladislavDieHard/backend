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
import { DepartmentService } from './department.service';
import { Department } from '@prisma/client';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DepartmentDto, DepartmentEntriesDto } from './dto/department.dto';
import { GetDepartmentEntriesResponse } from './department.types';
import { ErrorDto } from '../common.dto';

@ApiTags('Department')
@Controller('department')
export class DepartmentController extends DepartmentService {
  @ApiOperation({
    summary: 'Возвращает массив записей модели Department',
  })
  @ApiResponse({
    status: 201,
    type: DepartmentDto,
  })
  @ApiResponse({
    status: 500,
    type: ErrorDto,
  })
  @Get()
  getDepartments(): Promise<Department[]> {
    return this.departmentGetService.getDepartments();
  }

  @ApiOperation({
    summary: 'Возвращает массив записей модели Entry, выбранного Department',
  })
  @ApiResponse({
    status: 201,
    type: DepartmentEntriesDto,
  })
  @ApiResponse({
    status: 500,
    type: ErrorDto,
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
  })
  @ApiQuery({
    name: 'page',
    required: false,
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
  })
  @Get(':id/entries')
  getDepartmentEntries(
    @Param('id') id: string,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ): Promise<GetDepartmentEntriesResponse | Error> {
    return this.departmentGetService.getDepartmentEntries(id, page, pageSize);
  }

  @ApiOperation({
    summary: 'Возвращает запись модели Department',
  })
  @ApiResponse({
    status: 201,
    type: DepartmentDto,
  })
  @ApiResponse({
    status: 500,
    type: ErrorDto,
  })
  @ApiParam({
    name: 'idOrSlug',
    required: true,
    description: 'UUID or Slug',
    type: String || Number,
  })
  @Get(':idOrSlug')
  async getDepartment(
    @Param('idOrSlug') idOrSlug: string,
  ): Promise<Department> {
    return await this.departmentGetService.getDepartment(idOrSlug);
  }

  @ApiOperation({
    summary: 'Создаёт запись модели Department',
  })
  @ApiBody({
    type: DepartmentDto,
  })
  @ApiResponse({
    status: 201,
    type: DepartmentDto,
  })
  @ApiResponse({
    status: 500,
    type: ErrorDto,
  })
  @Post()
  createDepartment(
    @Body() newDepartment: Department,
  ): Promise<Department | Error> {
    return this.departmentCreateService.createDepartment(newDepartment);
  }

  @ApiOperation({
    summary: 'Обновляет запись модели Department',
  })
  @ApiResponse({
    status: 201,
    type: DepartmentDto,
  })
  @ApiResponse({
    status: 500,
    type: ErrorDto,
  })
  @ApiBody({
    type: DepartmentDto,
  })
  @ApiParam({
    name: 'idOrSlug',
    required: true,
    description: 'UUID or Slug',
    type: String || Number,
  })
  @Put(':idOrSlug')
  updateDepartment(
    @Param('idOrSlug') idOrSlug: string,
    @Body() newDepartment: Department,
  ): Promise<Department> {
    return this.departmentUpdateService.updateDepartment(
      idOrSlug,
      newDepartment,
    );
  }

  @ApiOperation({
    summary: 'Удаляет запись модели Department',
  })
  @ApiResponse({
    status: 201,
    type: DepartmentDto,
  })
  @ApiResponse({
    status: 500,
    type: ErrorDto,
  })
  @ApiParam({
    name: 'idOrSlug',
    required: true,
    description: 'UUID or Slug',
    type: String || Number,
  })
  @Delete(':idOrSlug')
  deleteDepartment(@Param('idOrSlug') idOrSlug: string) {
    return this.departmentDeleteService.deleteDepartment(idOrSlug);
  }
}
