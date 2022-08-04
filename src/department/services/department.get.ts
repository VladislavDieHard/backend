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
      .executeFindMany('Department');
  }

  async getDepartment(idOrSlug) {
    return this.executeFindUnique('Department', idOrSlug);
  }

  async getDepartmentEntries(options) {
    return this.addSearch(['title'], options.search)
      .includeFields(options.include)
      .addPagination(options.pageSize, options.page)
      .addOrderBy(options.orderBy)
      .addSearchByFieldValue(options.searchByField)
      .addRangeDateSearch('publishedAt', {
        fromDate: options.fromDate,
        toDate: options.toDate,
      })
      .executeFindModelByAnother('Entry', 'Department', options.idOrSlug);
  }
}
