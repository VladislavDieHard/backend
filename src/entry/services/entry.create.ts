import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Entry } from '@prisma/client';
import { v4 } from 'uuid';
import { createSlug } from '../../utils';

@Injectable()
export class EntryCreateService {
  constructor(private prismaService: PrismaService) {}

  async createEntry(newEntry: Entry) {
    newEntry.slug = createSlug(newEntry.title, newEntry.slug);

    return this.prismaService.entry
      .create({
        data: {
          id: v4(),
          ...newEntry,
        },
      })
      .then((entry) => entry)
      .catch((err) => {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }
}
