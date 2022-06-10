import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { parseIdOrSlug } from '../../utils';
import { Entry } from '@prisma/client';

@Injectable()
export class EntryUpdateService {
  constructor(private prismaService: PrismaService) {}

  async updateEntry(newEntry: Entry, idOrSlug) {
    const parsedIdOrSlug = parseIdOrSlug(idOrSlug);
    if (newEntry.slug) {
      newEntry.slug = newEntry.slug.toLowerCase();
    }

    console.log(newEntry);

    const entry = await this.prismaService.entry.findUnique({
      where: {
        ...parsedIdOrSlug,
      },
    });

    console.log(entry);

    return this.prismaService.entry
      .update({
        where: {
          ...parsedIdOrSlug,
        },
        data: newEntry,
      })
      .then((entry) => entry)
      .catch((err) => {
        console.log(err);
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }
}
