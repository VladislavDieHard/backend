import { Module } from '@nestjs/common';
import { EntryService } from './entry.service';
import { EntryController } from './entry.controller';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [EntryService, PrismaService],
  controllers: [EntryController],
})
export class EntryModule {}
