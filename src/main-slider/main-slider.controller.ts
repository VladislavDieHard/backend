import { Controller, Get, Query, Req } from '@nestjs/common';
import { MainSliderService } from './main-slider.service';

@Controller('main-slider')
export class MainSliderController extends MainSliderService {
  @Get()
  getAllSlides(
    @Req() req: any,
    @Query('pageSize') pageSize: number,
    @Query('page') page: string,
  ) {
    return this.getSlides({ path: req.originalUrl, pageSize, page });
  }
}
