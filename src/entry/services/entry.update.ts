import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { parseIdOrSlug } from '../../utils';
import { Entry } from '@prisma/client';

@Injectable()
export class EntryUpdateService {
  constructor(private prismaService: PrismaService) {}

  async updateEntry(newEntry: Entry, idOrSlug) {
    const parsedIdOrSlug = parseIdOrSlug(idOrSlug);
    newEntry.slug = newEntry.slug.toLowerCase();

    return this.prismaService.entry
      .update({
        where: {
          ...parsedIdOrSlug,
        },
        data: newEntry,
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
