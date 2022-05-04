import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Entry } from '@prisma/client';
import { v4 } from 'uuid';
import slugify from 'slugify';

@Injectable()
export class EntryCreateService {
  constructor(private prismaService: PrismaService) {}

  async createEntry(newEntry: Entry) {
    if (newEntry.slug) {
      newEntry.slug = newEntry.slug.toLowerCase();
    } else {
      newEntry.slug = slugify(newEntry.title, {
        replacement: '-',
        remove: undefined,
        lower: true,
        strict: false,
        locale: 'ru',
        trim: true,
      });
    }

    return this.prismaService.entry
      .create({
        data: {
          id: v4(),
          ...newEntry,
        },
      })
      .then((entry) => entry)
      .catch((err) => {
        throw new HttpException(err.meta, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }
}
