import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuType } from './menu.types';
import { Menu } from '@prisma/client';

@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Get()
  getMenus(@Query('type') type: MenuType) {
    return this.menuService.getMenus({
      type: type || undefined,
    });
  }

  @Get(':idOrSlug')
  getEntry(
    @Param('idOrSlug') idOrSlug: number | string,
    @Query('includes') includes?: string,
  ) {
    return this.menuService.getMenu(idOrSlug, includes);
  }

  @Post()
  createEntry(@Body() newEntry: Menu) {
    return this.menuService.createMenu(newEntry);
  }

  @Put(':idOrSlug')
  updateEntry(
    @Param('idOrSlug') idOrSlug: number | string,
    @Body() newMenu: Menu,
  ) {
    return this.menuService.updateMenu(newMenu, idOrSlug);
  }

  @Delete(':idOrSlug')
  deleteEntry(@Param('idOrSlug') idOrSlug: number | string) {
    return this.menuService.deleteMenu(idOrSlug);
  }
}
