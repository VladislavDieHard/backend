import { Module } from '@nestjs/common';
import { MainSliderController } from './main-slider.controller';
import { MainSliderService } from './main-slider.service';

@Module({
  controllers: [MainSliderController],
  providers: [MainSliderService]
})
export class MainSliderModule {}
