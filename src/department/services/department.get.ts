import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GetDepartmentEntriesResponse } from '../department.types';
import { createPagination } from '../../utils';
import { PrismaService } from '../../prisma.service';
import { Department } from '@prisma/client';
import { parseIdOrSlug } from '../../utils';

@Injectable()
export class DepartmentGetService {
  constructor(private prismaService: PrismaService) {}

  async getDepartments(): Promise<Department[]> {
    return this.prismaService.department
      .findMany({})
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw new HttpException(
          err.meta.cause,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }

  async getDepartment(idOrSlug): Promise<Department> {
    const parsedIdOrSlug = parseIdOrSlug(idOrSlug);
    return this.prismaService.department
      .findUnique({
        where: {
          ...parsedIdOrSlug,
        },
      })
      .then((department) => {
        return department;
      })
      .catch((err) => {
        throw new HttpException(err.meta.cause, HttpStatus.BAD_REQUEST);
      });
  }

  async getDepartmentEntries(
    id,
    page,
    pageSize,
  ): Promise<GetDepartmentEntriesResponse | Error> {
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

    return this.prismaService.entry
      .findMany({
        where: {
          departmentId: id,
          published: true,
        },
        take: pagination.pageSize || undefined,
        skip: (page - 1) * pagination.pageSize || undefined,
      })
      .then((result) => {
        return {
          data: result,
          meta: {
            pages: pagination.pages,
            pageSize: pagination.pageSize || 10,
            nextPage: page < pagination.pages ? nextPageString : null,
            prevPage: page > 1 ? prevPageString : null,
          },
        };
      })
      .catch((err) => {
        throw new HttpException(err.meta.cause, HttpStatus.BAD_REQUEST);
      });
  }
}
