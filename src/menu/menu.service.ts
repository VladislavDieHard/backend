import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Menu } from '@prisma/client';
import { parseIdOrSlug, parseIncludeArrString } from '../utils';
import { GetMenusOptions } from './menu.types';

@Injectable()
export class MenuService {
  constructor(private readonly prismaService: PrismaService) {}

  async getMenus(options: GetMenusOptions): Promise<Menu[]> {
    try {
      return await this.prismaService.menu.findMany({
        where: {
          menuType: options.type,
        },
      });
    } catch {
      throw new HttpException('Error with query', HttpStatus.BAD_REQUEST);
    }
  }

  async getMenu(idOrSlug, includesString): Promise<Menu> {
    const parsedIdOrSlug = parseIdOrSlug(idOrSlug);

    try {
      return await this.prismaService.menu.findUnique({
        where: {
          ...parsedIdOrSlug,
        },
        include: parseIncludeArrString(includesString),
      });
    } catch {
      throw new HttpException('Error with query', HttpStatus.BAD_REQUEST);
    }
  }

  async createMenu(newMenu: Menu): Promise<Menu> {
    try {
      return await this.prismaService.menu.create({
        data: newMenu,
      });
    } catch {
      throw new HttpException('Error with data', HttpStatus.BAD_REQUEST);
    }
  }

  async updateMenu(newEntry: Menu, idOrSlug): Promise<Menu> {
    const parsedIdOrSlug = parseIdOrSlug(idOrSlug);
    try {
      return await this.prismaService.menu.update({
        where: {
          ...parsedIdOrSlug,
        },
        data: newEntry,
      });
    } catch {
      throw new HttpException('Error with data', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteMenu(idOrSlug) {
    const parsedIdOrSlug = parseIdOrSlug(idOrSlug);
    try {
      return await this.prismaService.menu.delete({
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
