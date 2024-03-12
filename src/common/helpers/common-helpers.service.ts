import { validate } from 'uuid';
import slugify from 'slugify';
import moment from 'moment';

export class CommonHelpers {
  parseOrderBy(orderBy: string) {
    if (!orderBy) return undefined;
    if (orderBy[0] === '-') {
      return {
        [orderBy.slice(1)]: 'desc',
      };
    } else {
      return { [orderBy]: 'asc' };
    }
  }

  parseInclude(include: string, orderBy?: string) {
    if (!include) return {};

    const result = {};

    include.split(',').forEach((item) => {
      result[item] = true;
    });

    return result;
  }

  parseSlug(idOrSlug: string) {
    if (validate(idOrSlug)) {
      return { id: idOrSlug };
    } else {
      return { slug: idOrSlug };
    }
  }

  createIsDelete(isDeleted: string) {
    if (isDeleted) return {};
    else return { isDeleted: false };
  }

  createRangeDate(field: string, fromDate: string, toDate: string) {
    return {
      [field]: {
        gte: fromDate,
        lte: toDate,
      },
    };
  }

  createMeta(page: number, pageSize: number, total: number) {
    return {
      page: page || 1,
      pageSize: pageSize || 10,
      total: total,
    };
  }

  createPagination(page: number, pageSize: number = 10) {
    return {
      take: +pageSize || 10,
      skip: (page - 1) * pageSize || 0,
    };
  }

  createSlug(title: string, slug: string) {
    if (slug) return slug.toLowerCase();
    else {
      return (
        slugify(title, {
          replacement: '-',
          remove: /[^\w\s]/gi,
          lower: true,
          strict: false,
          locale: 'ru',
          trim: true,
        }) + `-${moment().format('YYYY-MM-DD')}`
      );
    }
  }
}
