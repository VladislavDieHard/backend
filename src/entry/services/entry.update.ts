import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { parseIdOrSlug } from '../../utils';
import { Entry, Prisma } from '@prisma/client';

@Injectable()
export class EntryUpdateService {
  constructor(private prismaService: PrismaService) {}

  async updateEntry(newEntry: Entry & { rubrics: string[] }, idOrSlug) {
    const parsedIdOrSlug = parseIdOrSlug(idOrSlug);
    if (newEntry.slug) {
      newEntry.slug = newEntry.slug.toLowerCase();
    }

    const entry = await this.prismaService.entry.findUnique({
      where: {
        ...parsedIdOrSlug,
      },
      include: {
        rubrics: true,
      },
    });

    for (const { rubricId, entryId } of entry.rubrics) {
      await this.prismaService.rubricsOnEntries.delete({
        where: {
          entryId_rubricId: { rubricId, entryId },
        },
      });
    }

    for (const rubric of newEntry.rubrics) {
      await this.prismaService.rubricsOnEntries.create({
        data: {
          rubricId: rubric,
          entryId: entry.id,
        },
      });
    }

    delete newEntry.rubrics;

    return this.prismaService.entry
      .update({
        where: {
          ...parsedIdOrSlug,
        },
        data: {
          ...(newEntry as Entry),
        },
        include: {
          rubrics: true,
        },
      })
      .then((entry) => entry)
      .catch((err) => {
        console.log(err);
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }
}
