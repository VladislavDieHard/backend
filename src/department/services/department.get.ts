import { Injectable } from '@nestjs/common';
import { GetService } from '../../commonServices/getService';

@Injectable()
export class DepartmentGetService extends GetService {
  async getDepartments({
    page,
    pageSize,
    isDeleted,
    orderBy,
    include,
  }): Promise<any> {
    return this.addPagination(page, pageSize)
      .addIsDeleted(isDeleted)
      .addOrderBy(orderBy)
      .includeFields(include)
      .executeFindMany('Department');
  }

  async getDepartment(idOrSlug, includeString) {
    return this.includeFields(includeString).executeFindUnique(
      'Department',
      idOrSlug,
    );
  }

  async getDepartmentEntries(options) {
    return this.addSearch(['title'], options.search)
      .includeFields(options.include)
      .addPagination(options.pageSize, options.page)
      .addOrderBy(options.orderBy)
      .addSearchByFieldValue(options.searchByField)
      .addIsDeleted(options.isDeleted)
      .addRangeDateSearch('publishedAt', {
        fromDate: options.fromDate,
        toDate: options.toDate,
      })

      .executeFindModelByAnother('Entry', 'Department', options.idOrSlug);
  }
}
