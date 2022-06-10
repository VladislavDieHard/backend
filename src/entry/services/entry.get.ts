import { Injectable } from '@nestjs/common';
import { Entry } from '@prisma/client';
import { GetService } from '../../commonServices/getService';

@Injectable()
export class EntryGetService extends GetService {
  async getEntries(options): Promise<any> {
    const entryCount = await this.prismaService.entry.count();

    return this.addSearch(['title'], options.search)
      .addPagination(entryCount, options.pageSize, options.page)
      .addOrderBy(options.orderBy)
      .executeFindMany('Entry');
  }

  async getEntry(idOrSlug, includesString): Promise<Entry> {
    return this.parseIdOrSlug(idOrSlug)
      .includeFields(includesString)
      .executeFindUnique('Entry');
  }
}
