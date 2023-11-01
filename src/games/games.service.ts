import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GamesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getGames(genres?: string[], search?: string) {
    return await this.prismaService.games.findMany({
      where: {
        name: {
          contains: search,
        },
        AND: genres.map((genre) => ({
          genres: {
            contains: genre,
          },
        })),
      },
    });
  }

  async getGame(id: string) {
    return await this.prismaService.games.findUnique({
      where: {
        id: id,
      },
    });
  }
}
