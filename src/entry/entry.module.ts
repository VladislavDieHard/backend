import { CommonHelpers } from './../common/helpers/common-helpers.service';
import { Module } from '@nestjs/common';
import { EntryService } from './entry.service';
import { EntryController } from './entry.controller';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [EntryService, PrismaService, CommonHelpers],
  controllers: [EntryController],
  exports: [EntryService],
})
export class EntryModule {}
