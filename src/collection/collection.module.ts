import { Module } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CollectionController } from './collection.controller';
import { PrismaService } from '../prisma.service';
import { CommonHelpers } from '../common/helpers/common-helpers.service';

@Module({
  controllers: [CollectionController],
  providers: [CollectionService, PrismaService, CommonHelpers],
})
export class CollectionModule {}
