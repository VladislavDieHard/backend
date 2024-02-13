import { CommonHelpers } from './../common/helpers/common-helpers.service';
import { PrismaService } from 'src/prisma.service';
import { Module } from '@nestjs/common';
import { SlidesService } from './slides.service';
import { SlidesController } from './slides.controller';

@Module({
  controllers: [SlidesController],
  providers: [SlidesService, PrismaService, CommonHelpers],
})
export class SlidesModule {}
