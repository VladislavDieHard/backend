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
        .then((entry) => resolve(entry))
        .catch((error) => reject(error));
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
          orderBy: orderBy ? orderBy : undefined,
          take: pagination?.pageSize || undefined,
          skip: (pagination?.page - 1) * pagination?.pageSize || undefined,
        })
        .then((entry) => {
          if (this.pagination) {
            resolve({
              data: entry,
              meta: GetService.createMeta(path, pagination),
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

  addSearch(fields: string[], searchString: string) {
    if (fields && searchString) {
      this.search = parseSearch(fields, searchString);
    } else {
      this.search = undefined;
    }
    return this;
  }

  addOrderBy(orderBy: string) {
    this.orderBy = createOrderBy(orderBy);
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
        console.log(this.searchByFieldObj);
      } else {
        this.searchByFieldObj = undefined;
      }
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
      this.searchRangeObj = undefined;
    }
    return this;
  }

  /* Service functions */

  private createWhereParams() {
    const params = {};
    if (this.searchRangeObj) {
      params[this.searchRangeObj.field] = {
        gte: this.searchRangeObj.fromDate,
        lte: this.searchRangeObj.toDate,
      };
    }
    if (this.search) {
      params['OR'] = this.search?.OR ? this.search.OR : undefined;
    }
    if (this.searchByFieldObj) {
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
      pages: pagination.pages,
      pageSize: pagination.pageSize || 10,
      nextPage: pagination.page < pagination.pages ? nextPageString : null,
      prevPage: pagination.page > 1 ? prevPageString : null,
    };
  }
}
