import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GetDepartmentEntriesResponse } from '../department.types';
import { createPagination } from '../../utils';
import { GetService } from '../../commonServices/getService';

@Injectable()
export class DepartmentGetService extends GetService {
  async getDepartments(options): Promise<any> {
    const count = await this.prismaService.department.count();

    return this.addPagination(count)
      .addOrderBy(options.orderBy)
      .includeFields(options.include)
      .executeFindMany('Department', options.path);
  }

  async getDepartment(idOrSlug) {
    return this.executeFindUnique('Department', idOrSlug);
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
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      });
  }
}
