import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { parseIdOrSlug } from '../../utils';

@Injectable()
export class EntryDeleteService {
  constructor(private prismaService: PrismaService) {}

  async deleteEntry(idOrSlug) {
    const parsedIdOrSlug = parseIdOrSlug(idOrSlug);

    return this.prismaService.entry
      .delete({
        where: {
          ...(parsedIdOrSlug as undefined as any),
        },
      })
      .then((entry) => entry)
      .catch((err) => {
        throw new HttpException(
          err.meta.cause,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }
}
