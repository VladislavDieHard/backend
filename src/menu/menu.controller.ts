import { CreateMenuDto } from './dto/create-menu.dto';
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
  Req,
  UseGuards,
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
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { QueryMenuDto } from './dto/query-menu.dto';

@ApiTags('Menu')
@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Get()
  findAll(@Query() query: QueryMenuDto) {
    return this.menuService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('include') include: string) {
    return this.menuService.findOne(id, include);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuDto: CreateMenuDto) {
    return this.menuService.update(id, updateMenuDto);
  }
}
