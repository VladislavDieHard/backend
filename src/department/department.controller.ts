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
// import { ErrorDto } from '../common.dto';

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
  getDepartments(
    @Query('pageSize') pageSize?: number,
    @Query('orderBy') orderBy?: string,
    @Query('include') include?: string,
    @Query('page') page?: number,
  ) {
    return this.departmentGetService.getDepartments({
      pageSize: pageSize,
      orderBy: orderBy,
      include: include,
      page: page,
    });
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
  @Get(':idOrSlug/entries')
  getDepartmentEntries(
    @Param('idOrSlug') idOrSlug: string,
    @Param('model') model: string,
    @Query('fromDate') fromDate?: Date,
    @Query('toDate') toDate?: Date,
    @Query('pageSize') pageSize?: number,
    @Query('orderBy') orderBy?: string,
    @Query('search') search?: string,
    @Query('page') page?: number,
    @Query('include') include?: string,
    @Query('searchByField') searchByField?: string,
  ): Promise<any> {
    return this.departmentGetService.getDepartmentEntries({
      idOrSlug,
      model,
      fromDate,
      toDate,
      pageSize,
      orderBy,
      search,
      page,
      include,
      searchByField,
    });
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
    @Query('include') include?: string,
  ) {
    return await this.departmentGetService.getDepartment(idOrSlug, include);
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

  // @Patch()
  // addEntriesToDepartment() {
  //   return
  // }

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
