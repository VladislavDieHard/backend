import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Entry } from '@prisma/client';
import { v4 } from 'uuid';
import { createSlug } from '../../utils';

@Injectable()
export class EntryCreateService {
  constructor(private prismaService: PrismaService) {}

  async createEntry(newEntry: Entry & { rubrics: string[] }) {
    newEntry.slug = createSlug(newEntry.title, newEntry.slug);

    const rubrics = newEntry.rubrics;

    delete newEntry.rubrics;

    const entry = await this.prismaService.entry
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

    for (const rubric of rubrics) {
      await this.prismaService.rubricsOnEntries.create({
        data: {
          rubricId: rubric,
          entryId: entry.id,
        },
      });
    }

    return this.prismaService.entry
      .findUnique({
        where: {
          id: entry.id,
        },
        include: {
          rubrics: true,
        },
      })
      .then((entry) => entry)
      .catch((err) => {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }
}
