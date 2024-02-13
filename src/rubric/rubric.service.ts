import { v4 } from 'uuid';
import { CreateRubricDto } from './dto/create-rubric.dto';
import { CommonHelpers } from './../common/helpers/common-helpers.service';
import { QueryEntryDto } from './dto/query-entry.dto';
import { PrismaService } from './../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RubricService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly commonHelpers: CommonHelpers,
  ) {}

  create(createRubricDto: CreateRubricDto) {
    return this.prismaService.rubric.create({
      data: {
        id: v4(),
        slug: this.commonHelpers.createSlug(
          createRubricDto.title,
          createRubricDto.slug,
        ),
        ...createRubricDto,
      },
    });
  }

  async findAll(query: QueryEntryDto) {
    const total = await this.prismaService.rubric.count();
    const rubric = await this.prismaService.rubric.findMany({
      where: {
        ...this.commonHelpers.createIsDelete(query.isDeleted),
      },
      ...this.commonHelpers.createPagination(query.page, query.pageSize),
    });
    return {
      data: rubric,
      meta: this.commonHelpers.createMeta(query.page, query.pageSize, total),
    };
  }

  findOne(idOrSlug: string) {
    return this.prismaService.rubric.findUnique({
      where: { ...this.commonHelpers.parseSlug(idOrSlug) },
    });
  }

  update(idOrSlug: string, updateCreateDto) {
    return this.prismaService.rubric.update({
      where: { ...this.commonHelpers.parseSlug(idOrSlug) },
      data: updateCreateDto,
    });
  }
}
