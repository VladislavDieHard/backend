import { UpdateAfficheDto } from './dto/update-affiche.dto';
import { v4 } from 'uuid';
import { CreateAfficheDto } from './dto/create-affiche.dto';
import { QueryAfficheDto } from './dto/query-affiche.dto';
import { CommonHelpers } from './../common/helpers/common-helpers.service';
import { PrismaService } from './../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AfficheService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly commonHelpers: CommonHelpers,
  ) {}

  create(createAfficheDto: CreateAfficheDto) {
    return this.prismaService.affiche.create({
      data: {
        id: v4(),
        slug: this.commonHelpers.createSlug(
          createAfficheDto.title,
          createAfficheDto.slug,
        ),
        ...createAfficheDto,
      },
    });
  }

  async findAll(query: QueryAfficheDto) {
    const total = await this.prismaService.affiche.count({
      where: {
        ...this.commonHelpers.createRangeDate(
          'eventDate',
          query.fromDate,
          query.toDate,
        ),
        ...this.commonHelpers.createIsDelete(query.isDeleted),
      },
    });

    const affiche = await this.prismaService.affiche.findMany({
      where: {
        ...this.commonHelpers.createRangeDate(
          'eventDate',
          query.fromDate,
          query.toDate,
        ),
        ...this.commonHelpers.createIsDelete(query.isDeleted),
      },
      orderBy: this.commonHelpers.parseOrderBy(query.orderBy),
      include: this.commonHelpers.parseInclude(query.inclued),
      ...this.commonHelpers.createPagination(query.page, query.pageSize),
    });

    return {
      data: affiche,
      meta: this.commonHelpers.createMeta(query.page, query.pageSize, total),
    };
  }

  findOne(idOrSlug: string) {
    return this.prismaService.affiche.findUnique({
      where: { ...this.commonHelpers.parseSlug(idOrSlug) },
    });
  }

  update(id: string, updateAfficheDto: UpdateAfficheDto) {
    return this.prismaService.affiche.update({
      where: { ...this.commonHelpers.parseSlug(id) },
      data: updateAfficheDto,
    });
  }
  delete(idOrSlug: string) {
    return this.prismaService.affiche.delete({
      where: { ...this.commonHelpers.parseSlug(idOrSlug) },
    });
  }
}
