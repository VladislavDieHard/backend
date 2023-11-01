import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createSlug, parseIdOrSlug } from '../utils';
import { ServiceArgs } from './menu-item.types';
import { MenuItem } from '@prisma/client';
import { MultiResponse } from '../commonServices/types';
import { GetService } from '../commonServices/getService';
import { v4 } from 'uuid';

@Injectable()
export class MenuItemService extends GetService {
  async getMenuItems(options: ServiceArgs): Promise<MultiResponse<MenuItem[]>> {
    try {
      return this.includeFields(options.include)
        .addPagination(options.pageSize, options.page)
        .addIsDeleted(options.isDeleted)
        .addSearchByFieldValue(options.searchByField)
        .executeFindMany('MenuItem');
    } catch (e) {
      throw new HttpException('Error with query', HttpStatus.BAD_REQUEST);
    }
  }

  async getMenuItem(idOrSlug, includeString): Promise<MenuItem> {
    try {
      return this.includeFields(includeString).executeFindUnique(
        'MenuItem',
        idOrSlug,
      );
    } catch (e) {
      throw new HttpException('Error with query', HttpStatus.BAD_REQUEST);
    }
  }

  async createMenuItem(newMenuItem: MenuItem): Promise<MenuItem> {
    newMenuItem.slug = createSlug(newMenuItem.title, newMenuItem.slug);
    try {
      return await this.prismaService.menuItem.create({
        data: {
          id: v4(),
          ...newMenuItem,
        },
      });
    } catch (e) {
      throw new HttpException('Error with data', HttpStatus.BAD_REQUEST);
    }
  }

  async updateMenuItem(newMenuItem: MenuItem, idOrSlug): Promise<MenuItem> {
    const parsedIdOrSlug = parseIdOrSlug(idOrSlug);
    try {
      return await this.prismaService.menuItem.update({
        where: {
          ...(parsedIdOrSlug as undefined as any),
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
          ...(parsedIdOrSlug as undefined as any),
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
