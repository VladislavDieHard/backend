import { Injectable } from '@nestjs/common';
import { Affiche } from '@prisma/client';
import { GetService } from '../../commonServices/getService';

@Injectable()
export class AfficheGetService extends GetService {
  async getAffiches(options) {
    return this.addSearch(['title'], options.search)
      .addRangeDateSearch('eventDate', {
        fromDate: options.fromDate,
        toDate: options.toDate,
      })
      .addSearchByFieldValue(options.searchByField)
      .includeFields(options.include)
      .addPagination(options.pageSize, options.page)
      .addOrderBy(options.orderBy)
      .executeFindMany('Affiche', options.path);
  }

  async getAffiche(idOrSlug): Promise<Affiche> {
    return this.executeFindUnique('Affiche', idOrSlug);
  }
}
