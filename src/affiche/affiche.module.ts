import { CommonHelpers } from './../common/helpers/common-helpers.service';
import { Module } from '@nestjs/common';
import { AfficheService } from './affiche.service';
import { AfficheController } from './affiche.controller';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [PrismaService, AfficheService, CommonHelpers],
  controllers: [AfficheController],
})
export class AfficheModule {}
