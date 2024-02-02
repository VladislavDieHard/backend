import { Injectable } from '@nestjs/common';
import { DefaultArgs, DefaultSelection } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GamesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getGames(genres?: string[], search?: string, page?) {
    const count = await this.prismaService.games.count({
      where: {
        ...(this.createParams(genres, search) as any),
      },
    });
    const pagination = this.createPagination({
      count: count,
      page: page.page,
      pageSize: page.pageSize,
    });

    const data = await this.prismaService.games.findMany({
      where: {
        ...(this.createParams(genres, search) as undefined as any),
      },
      take: pagination?.pageSize || undefined,
      skip: (pagination?.page - 1) * pagination?.pageSize || 0,
    });

    return {
      data: data,
      meta: pagination,
    };
  }

  async getGame(id: string) {
    return await this.prismaService.games.findUnique({
      where: {
        id: id,
      },
    });
  }

  async getRandomGames() {
    return await this.prismaService.gamesRandom.findMany();
  }

  private createParams(genres?: string[], search?: string) {
    return {
      name: {
        contains: search,
      },
      AND: genres?.map((genre) => ({
        genres: {
          contains: genre,
        },
      })),
    };
  }

  private createPagination(options) {
    const page = options.page ? parseInt(options.page) : 1;
    const pageSize = options.pageSize ? parseInt(options.pageSize) : 10;
    const prevPageSize = Math.floor(options.count / pageSize);

    let pages;

    if (options.count % pageSize) {
      pages = options.count > pageSize ? prevPageSize + 1 : 1;
    } else {
      pages = options.count > pageSize ? prevPageSize : 1;
    }

    return {
      pageSize: pageSize,
      pages: pages,
      page: page,
    };
  }
}
