import { Injectable } from '@nestjs/common';
import { GetService } from '../../commonServices/getService';
import {
  createOrderBy,
  createPagination,
  parseIdOrSlug,
  parseIncludeArrString,
} from '../../utils';
import { searchByFieldValue } from '../../utils/searchByField';

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
    if (!toDate) toDate = new Date();

    const searchParams = {
      where: {
        pinned: false,
        rubrics: {
          some: {
            rubric: {
              ...parseIdOrSlug(idOrSlug),
            },
          },
        },
        publishedAt: {
          gte: fromDate,
          lte: toDate,
        },
        ...searchByFieldValue(searchByField),
        isDeleted: isDeleted === 'true' ? undefined : false,
        title: search,
      },
    };

    return new Promise(async (res, rej) => {
      const count = await this.prismaService.entry.count({ ...searchParams });

      const pagination = createPagination(
        count,
        this.pagination?.page,
        this.pagination?.pageSize,
      );

      this.prismaService.entry
        .findMany({
          ...searchParams,
          orderBy: createOrderBy(orderBy),
          include: parseIncludeArrString(include),
          take: pagination?.pageSize || undefined,
          skip: (pagination?.page - 1) * pagination?.pageSize || 0,
        })
        .then((data) =>
          res({
            data: data,
            meta: {
              page: pagination.page,
              total: pagination.total,
              pageSize: pagination.pageSize || 10,
            },
          }),
        )
        .catch((err) => rej(err));
    });
  }
}
