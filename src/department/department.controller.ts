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
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { DepartmentDto } from './dto/department.dto';

@ApiTags('Department')
@Controller('department')
export class DepartmentController {
  constructor(private departmentService: DepartmentService) {}

  @Get()
  getDepartments() {
    return this.departmentService.getDepartments();
  }

  @Get(':id/entries')
  getDepartmentEntries(
    @Param('id') id: number,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ) {
    return this.departmentService.getDepartmentEntries(id, page, pageSize);
  }

  @Get(':idOrSlug')
  getDepartment(@Param('idOrSlug') idOrSlug: number | string) {
    return this.departmentService.getDepartment(idOrSlug);
  }

  @ApiBody({
    type: DepartmentDto,
  })
  @Post()
  createDepartment(@Body() newDepartment: Department) {
    return this.departmentService.createDepartment(newDepartment);
  }

  @ApiBody({
    type: DepartmentDto,
  })
  @Put(':idOrSlug')
  updateDepartment(
    @Param('idOrSlug') idOrSlug: number | string,
    @Body() newDepartment: Department,
  ) {
    return this.departmentService.updateDepartment(idOrSlug, newDepartment);
  }

  @Delete(':idOrSlug')
  deleteDepartment(@Param('idOrSlug') idOrSlug: number | string) {
    return this.departmentService.deleteDepartment(idOrSlug);
  }
}
