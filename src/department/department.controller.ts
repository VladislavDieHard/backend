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
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DepartmentDto, DepartmentEntriesDto } from './dto/department.dto';
import { GetDepartmentEntriesResponse } from './department.types';
import { CommonDto } from '../common.dto';

@ApiTags('Department')
@Controller('department')
export class DepartmentController extends DepartmentService {
  @ApiResponse({
    type: DepartmentDto,
  })
  @Get()
  getDepartments(): Promise<Department[]> {
    return this.departmentGetService.getDepartments();
  }

  @ApiResponse({
    status: 201,
    type: DepartmentEntriesDto,
  })
  @ApiResponse({
    status: 400,
    type: CommonDto,
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

  @ApiResponse({
    status: 201,
    type: DepartmentDto,
  })
  @ApiResponse({
    status: 400,
    type: CommonDto,
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

  @ApiBody({
    type: DepartmentDto,
  })
  @ApiResponse({
    status: 201,
    type: DepartmentDto,
  })
  @ApiResponse({
    status: 400,
    type: CommonDto,
  })
  @Post()
  createDepartment(
    @Body() newDepartment: Department,
  ): Promise<Department | Error> {
    return this.departmentCreateService.createDepartment(newDepartment);
  }

  @ApiResponse({
    status: 201,
    type: DepartmentDto,
  })
  @ApiResponse({
    status: 400,
    type: CommonDto,
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

  @ApiResponse({
    status: 201,
    type: DepartmentDto,
  })
  @ApiResponse({
    status: 400,
    type: CommonDto,
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
