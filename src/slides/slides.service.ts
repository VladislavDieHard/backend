import { CommonHelpers } from './../common/helpers/common-helpers.service';
import { QuerySlideDto, QuerySlideOneDto } from './dto/query-slides.dto';
import { PrismaService } from 'src/prisma.service';

import { Injectable } from '@nestjs/common';
import { CreateSlideDto } from './dto/create-slide.dto';
import { UpdateSlideDto } from './dto/update-slide.dto';

@Injectable()
export class SlidesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly commonHelpers: CommonHelpers,
  ) {}

  create(createSlideDto: CreateSlideDto) {
    return this.prismaService.mainSlider.create({
      data: {
        ...(createSlideDto as any),
      },
    });
  }

  async findAll(query: QuerySlideDto) {
    const total = await this.prismaService.mainSlider.count();

    const slides = await this.prismaService.mainSlider.findMany({
      orderBy: this.commonHelpers.parseOrderBy(query.orderBy),
      include: this.commonHelpers.parseInclude(query.include),
      ...this.commonHelpers.createPagination(query.page, query.pageSize),
    });

    return {
      data: slides,
      meta: this.commonHelpers.createMeta(query.page, query.pageSize, total),
    };
  }

  async findOne(id: string, query: QuerySlideOneDto) {
    return await this.prismaService.mainSlider.findUnique({
      where: {
        id: id,
      },
      include: this.commonHelpers.parseInclude(query.include),
    });
  }

  update(id: string, updateSlideDto: UpdateSlideDto) {
    return this.prismaService.mainSlider.update({
      where: { id: id },
      data: updateSlideDto as any,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} slide`;
  }
}
