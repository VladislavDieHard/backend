import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { parseIdOrSlug } from '../../utils';

@Injectable()
export class EntryDeleteService {
  constructor(private prismaService: PrismaService) {}

  async deleteEntry(idOrSlug) {
    const parsedIdOrSlug = parseIdOrSlug(idOrSlug);
    try {
      return await this.prismaService.entry.delete({
        where: {
          ...parsedIdOrSlug,
        },
      });
    } catch (e) {
      throw new HttpException(
        e.meta.cause || 'Bad request',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
