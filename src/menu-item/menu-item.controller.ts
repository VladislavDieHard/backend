import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MenuItem } from '@prisma/client';
import { MenuItemService } from './menu-item.service';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MenuDto } from '../menu/dto/menu.dto';
import { MenuType } from '../menu/menu.types';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('MenuItem')
@Controller('menu-item')
export class MenuItemController {
  constructor(private menuItemService: MenuItemService) {}

  @ApiResponse({
    status: 200,
    description: 'Возвращает записи MenuItem',
    type: MenuDto,
  })
  @ApiOperation({
    summary: 'Возвращает записи модели MenuItem',
  })
  @Get()
  async getMenuItems(
    @Query('searchByField') searchByField?: string,
    @Query('isDeleted') isDeleted?: string,
    @Query('pageSize') pageSize?: number,
    @Query('page') page?: number,
    @Query('include') include?: string,
  ) {
    return this.menuItemService.getMenuItems({
      searchByField,
      include: include || undefined,
      page,
      pageSize,
      isDeleted,
    });
  }

  @ApiResponse({
    status: 200,
    description: 'Возвращает одну запись модели MenuItem',
    type: MenuDto,
  })
  @ApiOperation({
    summary: 'Возвращает одну запись модели MenuItem',
  })
  @ApiQuery({
    name: 'type',
    required: false,
    description: 'Укажите тип меню, что-бы вернуть только данный тип',
    enum: MenuType,
  })
  @ApiQuery({
    name: 'include',
    required: false,
    description: 'Укажите модели для включения полей в ответ',
    example: 'menuItems',
  })
  @ApiParam({
    name: 'Id or Slug',
    type: String,
  })
  @Get('/:idOrSlug')
  getMenuItem(
    @Param('idOrSlug') idOrSlug: string,
    @Query('include') include?: string,
  ) {
    return this.menuItemService.getMenuItem(idOrSlug, include);
  }

  @ApiResponse({
    status: 200,
    description: 'Создаёт запись модели MenuItem',
    type: MenuDto,
  })
  @ApiOperation({
    summary: 'Создаёт запись модели MenuItem',
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  createMenuItem(@Body() newMenuItem: MenuItem) {
    return this.menuItemService.createMenuItem(newMenuItem);
  }

  @ApiResponse({
    status: 200,
    description: 'Обновляет запись модели MenuItem',
    type: MenuDto,
  })
  @ApiOperation({
    summary: 'Обновляет запись модели MenuItem',
  })
  @ApiParam({
    name: 'Id or Slug',
    type: String,
  })
  @UseGuards(JwtAuthGuard)
  @Put('/:idOrSlug')
  updateMenuItem(
    @Param('idOrSlug') idOrSlug: number | string,
    @Body() newMenuItem: MenuItem,
  ) {
    return this.menuItemService.updateMenuItem(newMenuItem, idOrSlug);
  }

  @ApiResponse({
    status: 200,
    description: 'Удаляет запись модели MenuItem',
    type: MenuDto,
  })
  @ApiOperation({
    summary: 'Удаляет запись модели MenuItem',
  })
  @ApiParam({
    name: 'Id or Slug',
    type: String,
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':idOrSlug')
  deleteMenuItem(@Param('idOrSlug') idOrSlug: string) {
    return this.menuItemService.deleteMenuItem(idOrSlug);
  }
}
