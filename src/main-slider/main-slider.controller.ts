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
import { MainSliderService } from './main-slider.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MainSlider } from '@prisma/client';

@Controller('main-slider')
export class MainSliderController {
  constructor(private mainSliderService: MainSliderService) {}

  @Get()
  async getSlides(
    @Query('searchByField') searchByField?: string,
    @Query('pageSize') pageSize?: number,
    @Query('page') page?: number,
    @Query('include') include?: string,
  ) {
    return this.mainSliderService.getSlides({
      searchByField: searchByField,
      include: include || undefined,
      page: page,
      pageSize: pageSize,
    });
  }

  @Get(':idOrSlug')
  getMenuItem(
    @Param('idOrSlug') idOrSlug: string,
    @Query('include') include?: string,
  ) {
    return this.mainSliderService.getSlide(idOrSlug, include);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createMenuItem(@Body() mainSlider: MainSlider) {
    return this.mainSliderService.createSlide(mainSlider);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':idOrSlug')
  updateMenuItem(
    @Body() mainSlider: MainSlider,
    @Param('idOrSlug') idOrSlug: string,
  ) {
    return this.mainSliderService.updateSlide(mainSlider, idOrSlug);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':idOrSlug')
  deleteMenuItem(@Param('idOrSlug') idOrSlug: string) {
    return this.mainSliderService.deleteSlide(idOrSlug);
  }
}
