import { Entry, RubricsOnEntries } from '@prisma/client';
import { EntryUpdateDto } from './dto/entry-update.dto';
import { v4 } from 'uuid';
import { EntryCreateDto } from './dto/entry-create.dto';
import { CommonHelpers } from './../common/helpers/common-helpers.service';
import { EntryAllQueryDto, EntryOneQueryDto } from './dto/entry-query.dto';
import { PrismaService } from './../prisma.service';
import { Injectable, Scope } from '@nestjs/common';
import { rubric } from 'src/migrations/models/rubric';
import { department } from 'src/migrations/models/department';

@Injectable({ scope: Scope.REQUEST })
export class EntryService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly commonHelpers: CommonHelpers,
  ) {}

  async create(newEntry: EntryCreateDto) {
    const rubrics = newEntry.rubrics;
    delete newEntry.rubrics;

    newEntry.slug = this.commonHelpers.createSlug(
      newEntry.title,
      newEntry.slug,
    );
    newEntry.fileId = newEntry.fileId
      ? newEntry.fileId
      : 'dd94879f-f091-40cb-9da4-118ca01f402a';
      
    const entry = await this.prismaService.entry.create({
      data: {
        id: v4(),
        ...(newEntry as any),
      },
    });

    rubrics.forEach(async (item) => {
      await this.prismaService.rubricsOnEntries.create({
        data: {
          rubricId: item,
          entryId: entry.id,
        },
      });
    });

    return this.prismaService.entry.findUnique({
      where: {
        id: entry.id,
      },
    });
  }

  async findAll(param?: EntryAllQueryDto): Promise<any> {
    const whereParams = {
      department: {
        ...this.commonHelpers.parseSlug(param.department),
      },
      rubrics: {
        some: {
          rubric: {
            ...this.commonHelpers.parseSlug(param.rubric),
          },
        },
      },
      ...this.commonHelpers.createIsDelete(param.isDeleted),
      ...this.commonHelpers.createRangeDate(
        'publishedAt',
        param.fromDate,
        param.toDate,
      ),
    };

    const count = await this.prismaService.entry.count({
      where: whereParams,
    });

    const entries = await this.prismaService.entry.findMany({
      where: whereParams,
      orderBy: this.commonHelpers.parseOrderBy(param.orderBy),
      include: this.commonHelpers.parseInclude(param.include),
      ...this.commonHelpers.createPagination(param.page, param.pageSize),
    });

    return {
      data: entries,
      meta: this.commonHelpers.createMeta(param.page, param.pageSize, count),
    };
  }

  async findOne(
    idOrSlug: string,
    param?: EntryOneQueryDto,
  ): Promise<Entry & { rubrics?: RubricsOnEntries[] }> {
    return await this.prismaService.entry.findUnique({
      where: {
        ...this.commonHelpers.parseSlug(idOrSlug),
      },
      include: this.commonHelpers.parseInclude(param.include),
    });
  }

  async findPinned() {
    return this.prismaService.entry.findFirst({
      where: { pinned: true },
      orderBy: { publishedAt: 'desc' },
      include: { preview: true },
    });
  }

  async update(id: string, newEntry: EntryUpdateDto) {
    try {
      const entry = await this.findOne(id, { include: 'rubrics' });

      if (newEntry.rubrics) {
        for (const { rubricId, entryId } of entry.rubrics) {
          await this.prismaService.rubricsOnEntries.delete({
            where: { entryId_rubricId: { rubricId, entryId } },
          });
        }

        for (const rubric of newEntry.rubrics) {
          await this.prismaService.rubricsOnEntries.create({
            data: { rubricId: rubric, entryId: entry.id },
          });
        }

        delete newEntry.rubrics;
      }

      return this.prismaService.entry.update({
        where: {
          ...this.commonHelpers.parseSlug(id),
        },
        data: {
          ...(newEntry as any),
        },
      });
    } catch (e) {
      return e;
    }
  }
}
