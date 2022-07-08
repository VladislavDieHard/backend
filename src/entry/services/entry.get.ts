import { Injectable } from '@nestjs/common';
import { Entry } from '@prisma/client';
import { GetService } from '../../commonServices/getService';

@Injectable()
export class EntryGetService extends GetService {
  async getEntries(options): Promise<GetEntriesType> {
    return this.addSearch(['title'], options.search)
      .addRangeDateSearch('createdAt', {
        fromDate: options.fromDate,
        toDate: options.toDate,
      })
      .addSearchByFieldValue(options.searchByField)
      .includeFields(options.include)
      .addPagination(options.pageSize, options.page)
      .addOrderBy(options.orderBy)
      .executeFindMany('Entry', options.path);
  }

  async getEntry(idOrSlug, includesString): Promise<Entry> {
    return this.includeFields(includesString).executeFindUnique(
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
    nextPage: string | null;
    prevPage: string | null;
  };
};
