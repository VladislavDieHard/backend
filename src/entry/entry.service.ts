import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { EntryGetService } from './services/entry.get';
import { EntryCreateService } from './services/entry.create';
import { EntryUpdateService } from './services/entry.update';
import { EntryDeleteService } from './services/entry.delete';

@Injectable()
export class EntryService {
  constructor(
    protected entryGetService: EntryGetService,
    protected entryCreateService: EntryCreateService,
    protected entryUpdateService: EntryUpdateService,
    protected entryDeleteService: EntryDeleteService,
  ) {}
}
