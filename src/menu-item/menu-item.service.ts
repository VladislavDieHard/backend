import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { QueryMenuItemDto } from './dto/query-menu-item.dto';
import { CommonHelpers } from './../common/helpers/common-helpers.service';
import { PrismaService } from './../prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createSlug, parseIdOrSlug } from '../utils';
import { ServiceArgs } from './menu-item.types';
import { MenuItem } from '@prisma/client';
import { MultiResponse } from '../commonServices/types';
import { GetService } from '../commonServices/getService';
import { v4 } from 'uuid';
import { count } from 'console';

@Injectable()
export class MenuItemService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly commonHelpers: CommonHelpers,
  ) {}

  create(createMenuItemDto: CreateMenuItemDto) {
    return this.prismaService.menuItem.create({
      data: {
        id: v4(),
        slug: this.commonHelpers.createSlug(
          createMenuItemDto.title,
          createMenuItemDto.slug,
        ),
        ...createMenuItemDto,
      },
    });
  }

  async findAll(query: QueryMenuItemDto) {
    const total = await this.prismaService.menuItem.count({
      where: {
        menuId: query.menuId,
        ...this.commonHelpers.createIsDelete(query.isDeleted),
      },
    });

    const menuItem = await this.prismaService.menuItem.findMany({
      where: {
        menuId: query.menuId,
        ...this.commonHelpers.createIsDelete(query.isDeleted),
      },
      include: this.commonHelpers.parseInclude(query.include),
      ...this.commonHelpers.createPagination(query.page, query.pageSize),
    });

    return {
      data: menuItem,
      meta: this.commonHelpers.createMeta(query.page, query.pageSize, total),
    };
  }

  findOne(idOrSlug: string, include) {
    return this.prismaService.menuItem.findUnique({
      where: {
        ...this.commonHelpers.parseSlug(idOrSlug),
      },
      include: this.commonHelpers.parseInclude(include),
    });
  }

  update(id: string, updateMenuItemDto: CreateMenuItemDto) {
    return this.prismaService.menuItem.update({
      where: { ...this.commonHelpers.parseSlug(id) },
      data: updateMenuItemDto,
    });
  }

  delete(id: string) {
    return this.prismaService.menuItem.delete({
      where: { ...this.commonHelpers.parseSlug(id) },
    });
  }
}
