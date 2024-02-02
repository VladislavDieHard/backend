import { PrismaService } from '../prisma.service';
import {
  createOrderBy,
  createPagination,
  parseIdOrSlug,
  parseIncludeArrString,
} from '../utils';
import { parseSearch } from '../utils/parsers';
import moment from 'moment';
import { searchByFieldValue } from '../utils/searchByField';

export class GetService {
  readonly prismaService: PrismaService;

  include: { [key: string]: boolean };
  pinned: object;
  search: { OR: Array<{ [key: string]: { contains: string } }> } | undefined;
  orderBy: object | undefined;
  isDeleted: boolean | undefined;
  pagination: any;
  searchRangeObj: { field: string; fromDate: Date; toDate: Date };
  searchByFieldObj: { field: string; query: string };

  constructor() {
    this.prismaService = new PrismaService();
  }

  /* Execute functions */

  executeFindFirst(model: string) {
    return new Promise((resolve, reject) => {
      this.prismaService[model]
        .findFirst({
          where: {
            ...this.createWhereParams(),
            isDeleted: undefined,
          },
          include: this.include,
        })
        .then((entry) => resolve(entry))
        .catch((error) => reject(error))
        .finally(() => {
          this.clearObject();
        });
    });
  }

  async executeFindPinned(): Promise<any> {
    return this.prismaService.entry.findFirst({
      where: { pinned: true },
      orderBy: {
        createdAt: 'desc',
      },
      include: { preview: true },
    });
  }

  async executeFindUnique(
    model: string,
    idOrSlug: string,
    isId?: boolean,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.prismaService[model]
        .findUnique({
          where: {
            ...parseIdOrSlug(idOrSlug, isId),
            ...this.createWhereParams(),
            isDeleted: undefined,
          },
          include: this.include,
        })
        .then((entry) => {
          this.clearObject();
          resolve(entry);
        })
        .catch((error) => {
          this.clearObject();
          reject(error);
        })
        .finally(() => {
          this.clearObject();
        });
    });
  }

  async executeFindMany(model: string): Promise<any> {
    const count = await this.prismaService[model].count({
      where: {
        ...this.createWhereParams(),
      },
    });

    console.log(this.orderBy);

    const pagination = createPagination(
      count,
      this.pagination?.page,
      this.pagination?.pageSize,
    );

    return new Promise((resolve, reject) => {
      this.prismaService[model]
        .findMany({
          ...this.createParamSearch(pagination),
        })
        .then((entry) => {
          if (this.pagination) {
            resolve({
              data: entry,
              meta: pagination,
            });
          } else {
            resolve({ data: entry });
          }
        })
        .catch((error) => {
          reject(error);
        })
        .finally(() => {
          this.clearObject();
        });
    });
  }

  async executeFindModelByAnother(
    modelOne: string,
    modelTwo: string,
    idOrSlug,
  ) {
    const count = await this.prismaService[modelOne].count({
      where: {
        ...this.createWhereParams(),
        [modelTwo.toLowerCase()]: parseIdOrSlug(idOrSlug),
      },
    });
    const pagination = createPagination(
      count,
      this.pagination?.page,
      this.pagination?.pageSize,
    );
    const orderBy = this.orderBy;
    return new Promise((resolve, reject) => {
      this.prismaService[modelOne]
        .findMany({
          where: {
            ...this.createWhereParams(),
            [modelTwo.toLowerCase()]: parseIdOrSlug(idOrSlug),
          },
          include: this.include,
          orderBy: orderBy ? orderBy : undefined,
          take: pagination?.pageSize || undefined,
          skip: (pagination?.page - 1) * pagination?.pageSize || 0,
        })
        .then((entry) => {
          this.clearObject();
          if (this.pagination) {
            resolve({
              data: entry,
              meta: pagination,
            });
          } else {
            resolve({ data: entry });
          }
        })
        .catch((error) => {
          this.clearObject();
          reject(error);
        })
        .finally(() => {
          this.clearObject();
        });
    });
  }

  /* Utility functions */

  createParamSearch(pagination) {
    return {
      where: this.createWhereParams(),
      include: this.include,
      orderBy: this.orderBy,
      take: pagination?.pageSize,
      skip: (pagination.page - 1) * pagination.pageSize || 0,
    };
  }

  addPagination(pageSize = 10, page = 1) {
    this.pagination = {
      pageSize: parseInt(String(pageSize)),
      page: page,
    };
    return this;
  }

  includeFields(fields: string) {
    if (fields) {
      this.include = parseIncludeArrString(fields);
    } else {
      this.include = undefined;
    }
    return this;
  }

  addNotPinned() {
    this.pinned = { where: { pinned: false } };
    return this;
  }

  // excludeFieldsByValue();

  addSearch(fields: string[], searchString: string) {
    if (fields && searchString) {
      this.search = parseSearch(fields, searchString);
    } else {
      this.search = undefined;
    }
    return this;
  }

  addIsDeleted(isDeleted: string) {
    if (isDeleted === 'true') {
      this.isDeleted = undefined;
    } else if (isDeleted === undefined) {
      this.isDeleted = false;
    } else {
      this.isDeleted = false;
    }
    return this;
  }

  addOrderBy(orderBy: string) {
    this.orderBy = orderBy ? createOrderBy(orderBy) : {};
    return this;
  }

  addSearchByFieldValue(searchByField: string) {
    this.searchByFieldObj = searchByFieldValue(searchByField);
    return this;
  }

  addRangeDateSearch(searchField: string, { fromDate, toDate }) {
    if (searchField && fromDate && toDate) {
      this.searchRangeObj = {
        field: searchField,
        fromDate: moment(fromDate).toDate(),
        toDate: moment(toDate).toDate(),
      };
    } else {
      this.searchRangeObj = undefined;
    }
    return this;
  }

  /* Service functions */

  private clearObject() {
    this.searchRangeObj = {
      field: undefined,
      fromDate: undefined,
      toDate: undefined,
    };
    this.include = undefined;
    this.search = undefined;
    this.orderBy = undefined;
    this.searchByFieldObj = undefined;
    this.searchRangeObj = undefined;
    this.isDeleted = undefined;
  }

  private createWhereParams() {
    const params = {};
    if (this.searchRangeObj) {
      params[this.searchRangeObj.field] = {
        gte: this.searchRangeObj.fromDate,
        lte: this.searchRangeObj.toDate,
      };
    }
    params['isDeleted'] = this.isDeleted;
    if (this.search) {
      params['OR'] = this.search?.OR ? this.search.OR : null;
    }
    if (this.searchByFieldObj?.field && this.searchByFieldObj?.query) {
      params[this.searchByFieldObj.field] = this.searchByFieldObj.query;
    }
    return params;
  }

  private static createMeta(pagination) {
    return {
      page: pagination.page,
      total: pagination.pages,
      pageSize: pagination.pageSize || 10,
    };
  }
}
