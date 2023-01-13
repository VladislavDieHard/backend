import { Injectable } from '@nestjs/common';
import { Entry } from '@prisma/client';
import { GetService } from '../../commonServices/getService';

@Injectable()
export class EntryGetService extends GetService {
  async getEntries({
    search,
    fromDate,
    toDate,
    searchByField,
    include,
    pageSize,
    page,
    orderBy,
    isDeleted,
  }: any): Promise<GetEntriesType> {
    return this.addSearch(['title', 'content'], search)
      .addRangeDateSearch('publishedAt', {
        fromDate,
        toDate,
      })
      .addIsDeleted(isDeleted)
      .addSearchByFieldValue(searchByField)
      .includeFields(include)
      .addPagination(pageSize, page)
      .addOrderBy(orderBy)
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
