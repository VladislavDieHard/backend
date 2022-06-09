import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { parseIdOrSlug, parseIncludeArrString } from '../../utils';
import { PrismaService } from '../../prisma.service';
import { createPagination } from '../../utils';
import { createOrderBy } from '../../utils';

@Injectable()
export class RubricGetService {
  constructor(private prismaService: PrismaService) {}

  async getRubrics(options) {
    const or = options.search
      ? {
          OR: [{ title: { contains: options.search } }],
        }
      : {};

    const orderBy = createOrderBy(options.search);

    const pagination = createPagination({
      count: await this.prismaService.rubric.count(),
      pageSize: parseInt(options.pageSize),
      page: options.page,
    });

    const nextPageString = orderBy
      ? `/rubric?page=${pagination.page + 1}&pageSize=${pagination.pageSize}
          &orderBy=${options.orderBy}`
      : `/rubric?page=${pagination.page + 1}&pageSize=${pagination.pageSize}`;

    const prevPageString = orderBy
      ? `/rubric?page=${pagination.page - 1}&pageSize=${
          pagination.pageSize
        }&orderBy=${options.orderBy}`
      : `/rubric?page=${pagination.page + 1}&pageSize=${pagination.pageSize}`;

    return this.prismaService.rubric
      .findMany({
        where: or,
        take: pagination.pageSize || undefined,
        skip: (pagination.page - 1) * pagination.pageSize || undefined,
      })
      .then((rubrics) => {
        return {
          data: rubrics,
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

  async getRubric(idOrSlug: string | number, includesString: string) {
    const parsedIdOrSlug = parseIdOrSlug(idOrSlug);

    return this.prismaService.rubric.findUnique({
      where: parsedIdOrSlug,
      include: parseIncludeArrString(includesString),
    });
  }
}
