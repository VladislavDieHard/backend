import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Department } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { parseIdOrSlug } from '../utils';
import { createPagination } from '../utils/pagination';

@Injectable()
export class DepartmentService {
  constructor(private prismaService: PrismaService) {}

  async getDepartments(): Promise<Department[]> {
    try {
      return await this.prismaService.department.findMany({});
    } catch {
      throw new HttpException('Error with query', HttpStatus.BAD_REQUEST);
    }
  }

  async getDepartment(idOrSlug): Promise<Department> {
    const parsedIdOrSlug = parseIdOrSlug(idOrSlug);
    try {
      return await this.prismaService.department.findUnique({
        where: {
          ...parsedIdOrSlug,
        },
      });
    } catch {
      throw new HttpException('Error with query', HttpStatus.BAD_REQUEST);
    }
  }

  async getDepartmentEntries(id, page, pageSize) {
    try {
      const entryCount = await this.prismaService.entry.count({});
      const pagination = createPagination({
        pageSize: parseInt(pageSize),
        count: entryCount,
      });
      const nextPageString = `/department/${id}/entries?page=${
        Number(page) + 1
      }&pageSize=${pagination.pageSize}`;
      const prevPageString = `/department/${id}/entries?page=${
        Number(page) - 1
      }&pageSize=${pagination.pageSize}`;
      const departmentEntries = await this.prismaService.entry.findMany({
        where: {
          departmentId: parseInt(id),
          published: true,
        },
        take: pagination.pageSize,
        skip: (page - 1) * pagination.pageSize,
      });
      return {
        data: departmentEntries,
        meta: {
          pages: pagination.pages || null,
          pageSize: pagination.pageSize || 10,
          nextPage: page < pagination.pages ? nextPageString : null,
          prevPage: page > 1 ? prevPageString : null,
        },
      };
    } catch {
      throw new HttpException('Error with query', HttpStatus.BAD_REQUEST);
    }
  }

  async createDepartment(newDepartment: Department): Promise<Department> {
    try {
      return this.prismaService.department.create({
        data: newDepartment,
      });
    } catch {
      throw new HttpException('Error with data', HttpStatus.BAD_REQUEST);
    }
  }

  async updateDepartment(
    idOrSlug,
    newDepartment: Department,
  ): Promise<Department> {
    const parsedIdOrSlug = parseIdOrSlug(idOrSlug);
    try {
      return this.prismaService.department.update({
        where: {
          ...parsedIdOrSlug,
        },
        data: newDepartment,
      });
    } catch {
      throw new HttpException('Error with data', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteDepartment(idOrSlug): Promise<Department> {
    const parsedIdOrSlug = parseIdOrSlug(idOrSlug);
    try {
      return this.prismaService.department.delete({
        where: {
          ...parsedIdOrSlug,
        },
      });
    } catch {
      throw new HttpException('Error with data', HttpStatus.BAD_REQUEST);
    }
  }
}
