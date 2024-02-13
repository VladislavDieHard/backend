import { CommonHelpers } from './../common/helpers/common-helpers.service';
import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [MenuService, PrismaService, CommonHelpers],
  controllers: [MenuController],
})
export class MenuModule {}
