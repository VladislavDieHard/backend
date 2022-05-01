import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { parseIdOrSlug, parseIncludeArrString } from '../utils';
import { PrismaService } from '../prisma.service';
import { Entry } from '@prisma/client';

@Injectable()
export class EntryService {
  constructor(private readonly prismaService: PrismaService) {}

  async getEntries(queries): Promise<Entry[]> {
    const or = queries.search
      ? {
          OR: [
            { title: { contains: queries.search } },
            { content: { contains: queries.search } },
          ],
        }
      : {};

    console.log(await this.prismaService.entry.count());

    try {
      return await this.prismaService.entry.findMany({
        where: {
          published: true,
          ...or,
        },
        take: Number(queries.take) || 10,
        skip: Number(queries.skip) || undefined,
      });
    } catch {
      throw new HttpException('Error with query', HttpStatus.BAD_REQUEST);
    }
  }

  async getEntry(idOrSlug, includesString): Promise<Entry> {
    const parsedIdOrSlug = parseIdOrSlug(idOrSlug);

    try {
      return await this.prismaService.entry.findUnique({
        where: {
          ...parsedIdOrSlug,
        },
        include: parseIncludeArrString(includesString),
      });
    } catch {
      throw new HttpException('Error with query', HttpStatus.BAD_REQUEST);
    }
  }

  async createEntry(newEntry: Entry) {
    newEntry.slug = newEntry.slug.toLowerCase();
    try {
      return await this.prismaService.entry.create({
        data: newEntry,
      });
    } catch {
      throw new HttpException('Error with data', HttpStatus.BAD_REQUEST);
    }
  }

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
