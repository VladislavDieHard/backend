import { CreateMenuDto } from './dto/create-menu.dto';
import { CommonHelpers } from './../common/helpers/common-helpers.service';
import { QueryMenuDto } from './dto/query-menu.dto';
import { PrismaService } from 'src/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GetMenusOptions } from './menu.types';
import { Menu } from '@prisma/client';
import { GetService } from '../commonServices/getService';
import { v4 } from 'uuid';

@Injectable()
export class MenuService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly commonHelpers: CommonHelpers,
  ) {}

  create(createMenuDto: CreateMenuDto) {
    return this.prismaService.menu.create({
      data: {
        id: v4(),
        ...createMenuDto,
      },
    });
  }

  async findAll(query: QueryMenuDto) {
    const total = await this.prismaService.menu.count({
      where: {
        menuType: query.type as any,
      },
    });

    const menus = await this.prismaService.menu.findMany({
      where: {
        menuType: query.type as any,
      },
      include: this.commonHelpers.parseInclude(query.include),
      ...this.commonHelpers.createPagination(query.page, query.pageSize),
    });

    return {
      data: menus,
      meta: this.commonHelpers.createMeta(query.page, query.pageSize, total),
    };
  }

  findOne(id: string, include: string) {
    return this.prismaService.menu.findUnique({
      where: { id: id },
      include: {
        menuItems: {
          orderBy: {
            position: 'asc',
          },
        },
        // ...this.commonHelpers.parseInclude(include),
      },
    });
  }

  update(id: string, updateMenuDto: CreateMenuDto) {
    return this.prismaService.menu.update({
      where: { id: id },
      data: updateMenuDto,
    });
  }

  // async getMenus(options: GetMenusOptions): Promise<Menu[]> {
  //   try {
  //     return this.includeFields(options.include)
  //       .addPagination(options.pageSize)
  //       .addIsDeleted(options.isDeleted)
  //       .addSearchByFieldValue(options.searchByField)
  //       .executeFindMany('Menu');
  //   } catch {
  //     throw new HttpException('Error with query', HttpStatus.BAD_REQUEST);
  //   }
  // }

  // async getMenu(id, includeString): Promise<Menu> {
  //   try {
  //     return this.includeFields(includeString).executeFindUnique('Menu', id);
  //   } catch {
  //     throw new HttpException('Error with query', HttpStatus.BAD_REQUEST);
  //   }
  // }

  // async createMenu(newMenu: Menu): Promise<Menu> {
  //   try {
  //     return await this.prismaService.menu.create({
  //       data: {
  //         ...newMenu,
  //         id: v4(),
  //       },
  //     });
  //   } catch {
  //     throw new HttpException('Error with data', HttpStatus.BAD_REQUEST);
  //   }
  // }

  // async updateMenu(newMenu: Menu, id): Promise<Menu> {
  //   return this.prismaService.menu
  //     .update({
  //       where: {
  //         id: id,
  //       },
  //       data: newMenu,
  //     })
  //     .then((data) => data)
  //     .catch((err) => {
  //       return err;
  //     });
  // }

  // async updateMenuMenuItems(newMenuItems, id): Promise<Menu> {
  //   const preparedMenuItems = newMenuItems.menuItems.map((item) => {
  //     return { id: item };
  //   });

  //   return this.prismaService.menu
  //     .update({
  //       where: {
  //         id: id,
  //       },
  //       data: {
  //         menuItems: {
  //           connect: [...preparedMenuItems],
  //         },
  //       },
  //     })
  //     .then((data) => data)
  //     .catch((err) => {
  //       return err;
  //     });
  // }

  // async deleteMenu(id): Promise<Menu> {
  //   try {
  //     return await this.prismaService.menu.delete({
  //       where: {
  //         id: id,
  //       },
  //     });
  //   } catch (e) {
  //     throw new HttpException(
  //       e.meta.cause || 'Bad request',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  // }
}
