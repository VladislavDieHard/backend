import { PrismaService } from '../prisma.service';
import {
  createOrderBy,
  createPagination,
  parseIdOrSlug,
  parseIncludeArrString,
  parseValue,
} from '../utils';
import { parseSearch } from '../utils/parsers';
import moment from 'moment';

export class GetService {
  readonly prismaService: PrismaService;
  include: {
    [key: string]: boolean;
  };
  search: { OR: Array<{ [key: string]: { contains: string } }> } | undefined;
  orderBy: object | undefined;
  pagination: any;
  searchRangeObj: {
    field: string;
    fromDate: Date;
    toDate: Date;
  };
  searchByFieldObj: {
    field: string;
    query: string;
  };

  constructor() {
    this.prismaService = new PrismaService();
  }

  /* Execute functions */

  executeFindFirst(model) {
    return new Promise((resolve, reject) => {
      this.prismaService[model]
        .findUnique({
          where: {
            ...this.createWhereParams(),
          },
          include: this.include,
        })
        .then((entry) => resolve(entry))
        .catch((error) => reject(error));
    });
  }

  async executeFindUnique(model, idOrSlug: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.prismaService[model]
        .findUnique({
          where: {
            ...parseIdOrSlug(idOrSlug),
            ...this.createWhereParams(),
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
        });
    });
  }

  async executeFindMany(model, path): Promise<any> {
    const count = await this.prismaService[model].count({
      where: {
        ...this.createWhereParams(),
      },
    });
    const pagination = createPagination({
      count: count,
      pageSize: this.pagination.pageSize,
      page: this.pagination.page,
    });
    const orderBy = this.orderBy;
    return new Promise((resolve, reject) => {
      this.prismaService[model]
        .findMany({
          where: {
            ...this.createWhereParams(),
          },
          include: this.include,
          orderBy: orderBy ? orderBy : null,
          take: pagination?.pageSize || null,
          skip: (pagination?.page - 1) * pagination?.pageSize || 0,
        })
        .then((entry) => {
          this.clearObject();
          if (this.pagination) {
            resolve({
              data: entry,
              meta: GetService.createMeta(path, pagination),
            });
          } else {
            resolve({ data: entry });
          }
        })
        .catch((error) => {
          this.clearObject();
          reject(error);
        });
    });
  }

  async executeFindModelByAnother(modelOne, modelTwo, idOrSlug, path) {
    const count = await this.prismaService[modelOne].count({
      where: {
        ...this.createWhereParams(),
        [modelTwo.toLowerCase()]: parseIdOrSlug(idOrSlug),
      },
    });
    const pagination = createPagination({
      count: count,
      pageSize: this.pagination.pageSize,
      page: this.pagination.page,
    });
    const orderBy = this.orderBy;
    return new Promise((resolve, reject) => {
      this.prismaService[modelOne]
        .findMany({
          where: {
            ...this.createWhereParams(),
            [modelTwo.toLowerCase()]: parseIdOrSlug(idOrSlug),
          },
          include: this.include,
          orderBy: orderBy ? orderBy : null,
          take: pagination?.pageSize || undefined,
          skip: (pagination?.page - 1) * pagination?.pageSize || 0,
        })
        .then((entry) => {
          this.clearObject();
          if (this.pagination) {
            resolve({
              data: entry,
              meta: GetService.createMeta(path, pagination),
            });
          } else {
            resolve({ data: entry });
          }
        })
        .catch((error) => {
          this.clearObject();
          reject(error);
        });
    });
  }

  /* Utility functions */

  includeFields(fields: string) {
    if (fields) {
      this.include = parseIncludeArrString(fields);
    } else {
      this.include = null;
    }
    return this;
  }

  addSearch(fields: string[], searchString: string) {
    if (fields && searchString) {
      this.search = parseSearch(fields, searchString);
    } else {
      this.search = null;
    }
    return this;
  }

  addOrderBy(orderBy: string) {
    if (orderBy) {
      this.orderBy = createOrderBy(orderBy);
    } else {
      this.orderBy = {};
    }
    return this;
  }

  addPagination(pageSize = 10, page = 1) {
    this.pagination = {
      pageSize: parseInt(String(pageSize)),
      page: page,
    };
    return this;
  }

  addSearchByFieldValue(searchByField: string) {
    if (searchByField) {
      const [key, value] = searchByField.split('=');
      if (key && value) {
        this.searchByFieldObj = {
          field: key,
          query: parseValue(value),
        };
      } else {
        this.searchByFieldObj = null;
      }
    } else {
      this.searchByFieldObj = null;
    }
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
      this.searchRangeObj = null;
    }
    return this;
  }

  /* Service functions */

  private clearObject() {
    this.searchRangeObj = {
      field: null,
      fromDate: null,
      toDate: null,
    };
    this.include = null;
    this.search = null;
    this.searchByFieldObj = null;
    this.searchRangeObj = null;
  }

  private createWhereParams() {
    const params = {};
    if (this.searchRangeObj) {
      params[this.searchRangeObj.field] = {
        gte: this.searchRangeObj.fromDate,
        lte: this.searchRangeObj.toDate,
      };
    }
    if (this.search) {
      params['OR'] = this.search?.OR ? this.search.OR : null;
    }
    if (this.searchByFieldObj?.field && this.searchByFieldObj?.query) {
      params[this.searchByFieldObj.field] = this.searchByFieldObj.query;
    }
    return params;
  }

  private static createMeta(path, pagination) {
    pagination.page = parseInt(pagination.page);

    const currPath = path;

    let nextPageString = currPath.replaceAll(
      /page=[0-9]/gm,
      `page=${pagination.page + 1}`,
    );

    nextPageString = nextPageString.replaceAll(
      /pageSize=[0-9]/gm,
      `pageSize=${pagination.pageSize}`,
    );

    let prevPageString = currPath.replaceAll(
      /page=[0-9]/gm,
      `page=${pagination.page - 1}`,
    );

    prevPageString = prevPageString.replaceAll(
      /pageSize=[0-9]/gm,
      `pageSize=${pagination.pageSize}`,
    );

    return {
      page: pagination.page,
      pages: pagination.pages,
      pageSize: pagination.pageSize || 10,
      nextPage: pagination.page < pagination.pages ? nextPageString : null,
      prevPage: pagination.page > 1 ? prevPageString : null,
    };
  }
}
