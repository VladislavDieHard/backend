import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { parseIncludeArrString } from '../utils';
import { GetMenusOptions } from './menu.types';
import { Menu } from '@prisma/client';
import { GetService } from '../commonServices/getService';

@Injectable()
export class MenuService extends GetService {
  async getMenus(options: GetMenusOptions): Promise<Menu[]> {
    try {
      return await this.prismaService.menu.findMany({
        where: {
          menuType: options.type,
        },
        include: parseIncludeArrString(options.includes),
      });
    } catch {
      throw new HttpException('Error with query', HttpStatus.BAD_REQUEST);
    }
  }

  async getMenu(id, includesString): Promise<Menu> {
    try {
      return await this.prismaService.menu.findUnique({
        where: {
          id: id,
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

  async updateMenu(newMenu: Menu, id): Promise<Menu> {
    try {
      return await this.prismaService.menu.update({
        where: {
          id: id,
        },
        data: newMenu,
      });
    } catch {
      throw new HttpException('Error with data', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteMenu(id): Promise<Menu> {
    try {
      return await this.prismaService.menu.delete({
        where: {
          id: id,
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
