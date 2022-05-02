import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { parseIdOrSlug, parseIncludeArrString } from '../../utils';
import { createPagination } from '../../utils/pagination';
import { PrismaService } from '../../prisma.service';
import { GetEntriesResponse } from '../entry.types';
import { Entry } from '@prisma/client';

@Injectable()
export class EntryGetService {
  constructor(private prismaService: PrismaService) {}

  async getEntries(options): Promise<GetEntriesResponse> {
    const or = options.search
      ? {
          OR: [
            { title: { contains: options.search } },
            { content: { contains: options.search } },
          ],
        }
      : {};

    const pagination = createPagination({
      pageSize: parseInt(options.pageSize),
      count: await this.prismaService.entry.count(),
    });

    const nextPageString = `/entry?page=${Number(options.page) + 1}&pageSize=${
      pagination.pageSize
    }`;

    const prevPageString = `/entry?page=${Number(options.page) - 1}&pageSize=${
      pagination.pageSize
    }`;

    try {
      const entries = await this.prismaService.entry.findMany({
        where: {
          published: true,
          ...or,
        },
        take: pagination.pageSize,
        skip: (options.page - 1) * pagination.pageSize,
      });
      return {
        data: entries,
        meta: {
          pages: pagination.pages,
          pageSize: pagination.pageSize || 10,
          nextPage: options.page < pagination.pages ? nextPageString : null,
          prevPage: options.page > 1 ? prevPageString : null,
        },
      };
    } catch {
      throw new HttpException('Error with query', HttpStatus.BAD_REQUEST);
    }
  }

  async getEntry(idOrSlug, includesString): Promise<Entry> {
    const parsedIdOrSlug = parseIdOrSlug(idOrSlug);

    try {
      return await this.prismaService.entry.findUnique({
        where: {
          ...parsedIdOrSlug,
        },
        include: parseIncludeArrString(includesString),
      });
    } catch {
      throw new HttpException('Error with query', HttpStatus.BAD_REQUEST);
    }
  }
}