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
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MenuDto } from './dto/menu.dto';

@ApiTags('Menu')
@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @ApiResponse({
    status: 200,
    description: 'Возвращает массив записей модели Menu',
    type: MenuDto,
    isArray: true,
  })
  @ApiOperation({
    summary: 'Возвращает массив записей модели Menu',
  })
  @ApiQuery({
    name: 'type',
    required: false,
    description: 'Укажите тип меню, что-бы вернуть только данный тип',
    enum: MenuType,
  })
  @ApiQuery({
    name: 'includes',
    required: false,
    description: 'Укажите модели для включения полей в ответ',
    example: 'menuItems',
  })
  @Get()
  getMenus(
    @Query('type') type?: MenuType,
    @Query('includes') includes?: string,
  ) {
    return this.menuService.getMenus({
      type: type || undefined,
      includes: includes || undefined,
    });
  }

  @ApiResponse({
    status: 200,
    description: 'Возвращает одну запись модели Menu',
    type: MenuDto,
  })
  @ApiOperation({
    summary: 'Возвращает одну запись модели Menu',
  })
  @ApiQuery({
    name: 'type',
    required: false,
    description: 'Укажите тип меню, что-бы вернуть только данный тип',
    enum: MenuType,
  })
  @ApiQuery({
    name: 'includes',
    required: false,
    description: 'Укажите модели для включения полей в ответ',
    example: 'menuItems',
  })
  @ApiParam({
    name: 'id',
    type: Number,
  })
  @Get(':id')
  getMenu(@Param('id') id: number, @Query('includes') includes?: string) {
    return this.menuService.getMenu(id, includes);
  }

  @ApiResponse({
    status: 200,
    description: 'Создаёт запись модели Menu',
    type: MenuDto,
  })
  @ApiOperation({
    summary: 'Создаёт запись модели Menu',
  })
  @Post()
  createMenu(@Body() newEntry: Menu) {
    return this.menuService.createMenu(newEntry);
  }

  @ApiResponse({
    status: 200,
    description: 'Обновляет запись модели Menu',
    type: MenuDto,
  })
  @ApiOperation({
    summary: 'Обновляет запись модели Menu',
  })
  @ApiParam({
    name: 'id',
    type: Number,
  })
  @Put(':id')
  updateMenu(@Param('id') id: number, @Body() newMenu: Menu) {
    return this.menuService.updateMenu(newMenu, id);
  }

  @ApiResponse({
    status: 200,
    description: 'Удаляет запись модели Menu',
    type: MenuDto,
  })
  @ApiOperation({
    summary: 'Удаляет запись модели Menu',
  })
  @ApiParam({
    name: 'id',
    type: Number,
  })
  @Delete(':id')
  deleteMenu(@Param('id') id: number) {
    return this.menuService.deleteMenu(id);
  }
}
