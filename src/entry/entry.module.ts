import { Module } from '@nestjs/common';
import { EntryService } from './entry.service';
import { EntryController } from './entry.controller';
import { PrismaService } from '../prisma.service';
import { EntryGetService } from './services/entry.get';
import { EntryCreateService } from './services/entry.create';
import { EntryDeleteService } from './services/entry.delete';
import { EntryUpdateService } from './services/entry.update';

@Module({
  providers: [
    EntryService,
    PrismaService,
    EntryGetService,
    EntryCreateService,
    EntryDeleteService,
    EntryUpdateService,
  ],
  controllers: [EntryController],
  exports: [
    EntryService,
    EntryGetService,
    EntryCreateService,
    EntryDeleteService,
    EntryUpdateService,
  ],
})
export class EntryModule {}
