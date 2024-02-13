import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { QueryMenuItemDto } from './dto/query-menu-item.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
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

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createMenuItemDto: CreateMenuItemDto) {
    return this.menuItemService.create(createMenuItemDto);
  }

  @Get()
  findAll(@Query() query: QueryMenuItemDto) {
    return this.menuItemService.findAll(query);
  }

  
  @Get(':id')
  findOne(@Param('id') idOrSlug: string, @Query('include') include: string) {
    return this.menuItemService.findOne(idOrSlug, include);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') idOrSlug: string,
    @Body() updateMenuItemDto: CreateMenuItemDto,
  ) {
    return this.menuItemService.update(idOrSlug, updateMenuItemDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.menuItemService.delete(id);
  }
}
