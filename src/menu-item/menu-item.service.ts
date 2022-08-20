import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { parseIdOrSlug, parseIncludeArrString } from '../utils';
import { MenuItemOptions } from './menu-item.types';
import { MenuItem } from '@prisma/client';
import { MultiResponse } from '../commonServices/types';
import { GetService } from '../commonServices/getService';

@Injectable()
export class MenuItemService extends GetService {
  async getMenuItems(
    options: MenuItemOptions,
  ): Promise<MultiResponse<MenuItem[]>> {
    try {
      return this.includeFields(options.includes)
        .addPagination()
        .addSearchByFieldValue(options.searchByField)
        .addSearch(['menuItemType', 'title'], options.searchString)
        .executeFindMany('MenuItem');
    } catch (e) {
      throw new HttpException('Error with query', HttpStatus.BAD_REQUEST);
    }
  }

  async getMenuItem(idOrSlug, includesString): Promise<MenuItem> {
    const parsedIdOrSlug = parseIdOrSlug(idOrSlug);

    try {
      return await this.prismaService.menuItem.findUnique({
        where: {
          ...parsedIdOrSlug,
        },
        include: parseIncludeArrString(includesString),
      });
    } catch (e) {
      throw new HttpException('Error with query', HttpStatus.BAD_REQUEST);
    }
  }

  async createMenuItem(newMenuItem: MenuItem): Promise<MenuItem> {
    try {
      return await this.prismaService.menuItem.create({
        data: newMenuItem,
      });
    } catch {
      throw new HttpException('Error with data', HttpStatus.BAD_REQUEST);
    }
  }

  async updateMenuItem(newMenuItem: MenuItem, idOrSlug): Promise<MenuItem> {
    const parsedIdOrSlug = parseIdOrSlug(idOrSlug);
    try {
      return await this.prismaService.menuItem.update({
        where: {
          ...parsedIdOrSlug,
        },
        data: newMenuItem,
      });
    } catch {
      throw new HttpException('Error with data', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteMenuItem(idOrSlug): Promise<MenuItem> {
    const parsedIdOrSlug = parseIdOrSlug(idOrSlug);
    try {
      return await this.prismaService.menuItem.delete({
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
