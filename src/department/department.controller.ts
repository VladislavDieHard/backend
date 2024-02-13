import { DepartmentUpdateDto } from './dto/department-update.dto';
import { DepartmentCreateDto } from './dto/department-create.dto';
import { DepartmentQueryDto } from './dto/department-query.dto';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DepartmentService } from './department.service';

import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Department')
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get()
  findAll(@Query() query: DepartmentQueryDto) {
    return this.departmentService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') idOrSlug: string, @Query('include') include: string) {
    return this.departmentService.findOne(idOrSlug, include);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newDepartment: DepartmentCreateDto) {
    return this.departmentService.create(newDepartment);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() newDepartment: DepartmentUpdateDto) {
    return this.departmentService.update(id, newDepartment);
  }
}
