import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GenreService {
  constructor(private readonly prismaService: PrismaService) {}

  async getGenres() {
    return await this.prismaService.genre.findMany({
      orderBy: {
        desc: 'asc',
      },
    });
  }
}
