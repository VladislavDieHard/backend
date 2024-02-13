import { DepartmentUpdateDto } from './dto/department-update.dto';
import { v4 } from 'uuid';
import { DepartmentCreateDto } from './dto/department-create.dto';
import { CommonHelpers } from './../common/helpers/common-helpers.service';
import { DepartmentQueryDto } from './dto/department-query.dto';
import { PrismaService } from './../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DepartmentService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly commonHelpers: CommonHelpers,
  ) {}

  async create(newDepartment: DepartmentCreateDto) {
    newDepartment.slug = this.commonHelpers.createSlug(
      newDepartment.title,
      newDepartment.slug,
    );

    return await this.prismaService.department.create({
      data: {
        id: v4(),
        ...newDepartment,
      },
    });
  }

  async findAll(query: DepartmentQueryDto) {
    const total = await this.prismaService.department.count({
      where: { isDeleted: query.isDeleted ? undefined : false },
    });
    const departments = await this.prismaService.department.findMany({
      where: { isDeleted: query.isDeleted ? undefined : false },
      include: this.commonHelpers.parseInclude(query.include),
      orderBy: this.commonHelpers.parseOrderBy(query.orderBy),
      ...this.commonHelpers.createPagination(query.page, query.pageSize),
    });
    return {
      data: departments,
      meta: this.commonHelpers.createMeta(query.page, query.pageSize, total),
    };
  }

  async findOne(id: string, include: string) {
    return await this.prismaService.department.findUnique({
      where: { ...this.commonHelpers.parseSlug(id) },
      include: this.commonHelpers.parseInclude(include),
    });
  }

  async update(id: string, newDepartment: DepartmentUpdateDto) {
    return await this.prismaService.department.update({
      where: { id: id },
      data: newDepartment,
    });
  }
}
