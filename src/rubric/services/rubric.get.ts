import { Injectable } from '@nestjs/common';
import { GetService } from '../../commonServices/getService';

@Injectable()
export class RubricGetService extends GetService {
  async getRubrics(options) {
    return this.addSearch(['title'], options.search)
      .addPagination(options.pageSize, options.page)
      .executeFindMany('Rubric', options.path);
  }

  async getRubric(idOrSlug: string, includesString: string) {
    return this.includeFields(includesString).executeFindUnique(
      'Rubric',
      idOrSlug,
    );
  }

  async getEntriesByRubric(options) {
    return this.addSearch(['title'], options.search)
      .addPagination(options.pageSize, options.page)
      .addOrderBy(options.orderBy)
      .addSearchByFieldValue(options.searchByField)
      .addRangeDateSearch('publishedAt', {
        fromDate: options.fromDate,
        toDate: options.toDate,
      })
      .executeFindModelByAnother(
        'Entry',
        'Rubric',
        options.idOrSlug,
        options.path,
      );
  }
}
