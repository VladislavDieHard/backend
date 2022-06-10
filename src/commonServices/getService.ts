import { PrismaService } from '../prisma.service';
import {
  createOrderBy,
  createPagination,
  parseIdOrSlug,
  parseIncludeArrString,
} from '../utils';
import { parseSearch } from '../utils/parsers';

// type GetServiceOptions = {};

export class GetService {
  prismaService: PrismaService;
  idOrSlug: object;
  include: {
    [key: string]: boolean;
  };
  search: { OR: Array<{ [key: string]: { contains: string } }> } | undefined;
  orderBy: object | undefined;
  pagination: any;

  constructor() {
    this.prismaService = new PrismaService();
  }

  /* Execute functions */

  async executeFindUnique(model): Promise<any> {
    return new Promise((resolve, reject) => {
      this.prismaService[model]
        .findUnique({
          where: {
            ...this.idOrSlug,
            ...this.createWhereParams(),
          },
          include: this.include,
        })
        .then((entry) => resolve(entry))
        .catch((error) => reject(error));
    });
  }

  async executeFindMany(model): Promise<any> {
    const pagination = this.pagination;
    const orderBy = this.orderBy;
    return new Promise((resolve, reject) => {
      this.prismaService[model]
        .findMany({
          where: {
            ...this.createWhereParams(),
          },
          include: this.include,
          orderBy: orderBy ? orderBy : undefined,
          take: pagination?.pageSize || undefined,
          skip: (pagination?.page - 1) * pagination?.pageSize || undefined,
        })
        .then((entry) => {
          if (this.pagination) {
            resolve({
              data: entry,
              meta: GetService.createMeta(model, pagination, orderBy),
            });
          } else {
            resolve({ data: entry });
          }
        })
        .catch((error) => reject(error));
    });
  }

  /* Utility functions */

  includeFields(fields: string) {
    this.include = parseIncludeArrString(fields);
    return this;
  }

  parseIdOrSlug(idOrSlug: string) {
    this.idOrSlug = parseIdOrSlug(idOrSlug);
    return this;
  }

  addSearch(fields: string[], searchString: string) {
    this.search = parseSearch(fields, searchString);
    return this;
  }

  addOrderBy(orderBy: string) {
    this.orderBy = createOrderBy(orderBy);
    return this;
  }

  addPagination(entryCount: number, pageSize = 10, page = 1) {
    this.pagination = createPagination({
      count: entryCount,
      pageSize: parseInt(String(pageSize)),
      page: page,
    });
    return this;
  }

  /* Service functions */

  private createWhereParams() {
    const params = {
      OR: undefined,
    };
    if (this.search) {
      params.OR = this.search.OR;
    }
    return params;
  }

  private static createMeta(modelName, pagination, orderBy) {
    const model = modelName
      .split(/(?=[A-Z])/)
      .join('-')
      .toLowerCase();

    const nextPageString = orderBy
      ? `/${model}?page=${pagination.page + 1}&pageSize=${
          pagination.pageSize
        }&orderBy=${orderBy}`
      : `/${model}?page=${pagination.page + 1}&pageSize=${pagination.pageSize}`;

    const prevPageString = orderBy
      ? `/${model}?page=${pagination.page - 1}&pageSize=${
          pagination.pageSize
        }&orderBy=${orderBy}`
      : `/${model}?page=${pagination.page + 1}&pageSize=${pagination.pageSize}`;

    return {
      pages: pagination.pages,
      pageSize: pagination.pageSize || 10,
      nextPage: pagination.page < pagination.pages ? nextPageString : null,
      prevPage: pagination.page > 1 ? prevPageString : null,
    };
  }
}
