import { Injectable } from '@nestjs/common';
import { GetService } from '../../commonServices/getService';

@Injectable()
export class RubricGetService extends GetService {
  async getRubrics(options) {
    return this.addSearch(['title'], options.search)
      .addIsDeleted(options.isDeleted)
      .addPagination(options.pageSize, options.page)
      .executeFindMany('Rubric');
  }

  async getRubric(idOrSlug: string, includesString: string) {
    return this.includeFields(includesString).executeFindUnique(
      'Rubric',
      idOrSlug,
    );
  }

  async getEntriesByRubric({
    search,
    isDeleted,
    include,
    pageSize,
    page,
    orderBy,
    searchByField,
    fromDate,
    toDate,
    idOrSlug,
  }) {
    return this.addSearch(['title'], search)
      .addIsDeleted(isDeleted)
      .includeFields(include)
      .addPagination(pageSize, page)
      .addOrderBy(orderBy)
      .addSearchByFieldValue(searchByField)
      .addRangeDateSearch('publishedAt', {
        fromDate,
        toDate,
      })
      .executeFindModelByAnother('Entry', 'Rubric', idOrSlug);
  }
}
