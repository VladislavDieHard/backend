import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Entry } from '@prisma/client';
import { parseIdOrSlug } from '../../utils';

@Injectable()
export class EntryUpdateService {
  constructor(private prismaService: PrismaService) {}

  async updateEntry(newEntry: Entry, idOrSlug) {
    const parsedIdOrSlug = parseIdOrSlug(idOrSlug);
    newEntry.slug = newEntry.slug.toLowerCase();
    try {
      return await this.prismaService.entry.update({
        where: {
          ...parsedIdOrSlug,
        },
        data: newEntry,
      });
    } catch {
      throw new HttpException('Error with data', HttpStatus.BAD_REQUEST);
    }
  }
}
