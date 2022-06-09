import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { parseIdOrSlug, parseIncludeArrString } from '../../utils';
import { PrismaService } from '../../prisma.service';
import { GetEntriesResponse } from '../entry.types';
import { createPagination } from '../../utils';
import { createOrderBy } from '../../utils';
import { Entry } from '@prisma/client';

@Injectable()
export class EntryGetService {
  constructor(private prismaService: PrismaService) {}

  async getEntries(options): Promise<GetEntriesResponse> {
    const or = options.search
      ? {
          OR: [{ title: { contains: options.search } }],
        }
      : {};

    const orderBy = createOrderBy(options.orderBy);

    const pagination = createPagination({
      count: await this.prismaService.entry.count(),
      pageSize: parseInt(options.pageSize),
      page: options.page,
    });

    const nextPageString = orderBy
      ? `/entry?page=${pagination.page + 1}&pageSize=${
          pagination.pageSize
        }&orderBy=${options.orderBy}`
      : `/entry?page=${pagination.page + 1}&pageSize=${pagination.pageSize}`;

    const prevPageString = orderBy
      ? `/entry?page=${pagination.page - 1}&pageSize=${
          pagination.pageSize
        }&orderBy=${options.orderBy}`
      : `/entry?page=${pagination.page + 1}&pageSize=${pagination.pageSize}`;

    return this.prismaService.entry
      .findMany({
        where: {
          published: false,
          ...or,
        },
        take: pagination.pageSize || undefined,
        skip: (pagination.page - 1) * pagination.pageSize || undefined,
        orderBy: orderBy ? orderBy : { createdAt: 'asc' },
      })
      .then((entries) => {
        return {
          data: entries,
          meta: {
            pages: pagination.pages,
            pageSize: pagination.pageSize || 10,
            nextPage:
              pagination.page < pagination.pages ? nextPageString : null,
            prevPage: pagination.page > 1 ? prevPageString : null,
          },
        };
      })
      .catch((err) => {
        throw new HttpException(err.meta, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  async getEntry(idOrSlug, includesString): Promise<Entry> {
    const parsedIdOrSlug = parseIdOrSlug(idOrSlug);

    return this.prismaService.entry
      .findUnique({
        where: parsedIdOrSlug,
        include: parseIncludeArrString(includesString),
      })
      .then((entry) => entry)
      .catch((err) => {
        throw new HttpException(err.meta, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }
}
