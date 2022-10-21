import { Injectable } from '@nestjs/common';
import { Entry } from '@prisma/client';
import { GetService } from '../../commonServices/getService';

@Injectable()
export class EntryGetService extends GetService {
  async getEntries(options): Promise<GetEntriesType> {
    return this.addSearch(['title'], options.search)
      .addRangeDateSearch('publishedAt', {
        fromDate: options.fromDate,
        toDate: options.toDate,
      })
      .addSearchByFieldValue(options.searchByField)
      .includeFields(options.include)
      .addPagination(options.pageSize, options.page)
      .addOrderBy(options.orderBy)
      .executeFindMany('Entry');
  }

  async getEntry(idOrSlug, includeString): Promise<Entry> {
    return this.includeFields(includeString).executeFindUnique(
      'Entry',
      idOrSlug,
    );
  }
}

type GetEntriesType = {
  data: Entry[];
  meta: {
    pages: number;
    pageSize: number;
  };
};
