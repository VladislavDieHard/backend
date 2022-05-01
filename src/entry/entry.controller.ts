import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { EntryService } from './entry.service';
import { Entry } from '@prisma/client';

@Controller('entry/')
export class EntryController {
  constructor(private entryService: EntryService) {}

  @Get()
  getEntries(
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
    @Query('search') search?: string,
  ) {
    return this.entryService.getEntries({
      take: limit,
      skip: offset,
      search: search,
    });
  }

  @Get(':idOrSlug')
  getEntry(
    @Param('idOrSlug') idOrSlug: number | string,
    @Query('includes') includes?: string,
  ) {
    return this.entryService.getEntry(idOrSlug, includes);
  }

  @Post()
  createEntry(@Body() newEntry: Entry) {
    return this.entryService.createEntry(newEntry);
  }

  @Put(':idOrSlug')
  updateEntry(
    @Param('idOrSlug') idOrSlug: number | string,
    @Body() newEntry: Entry,
  ) {
    return this.entryService.updateEntry(newEntry, idOrSlug);
  }

  @Delete(':idOrSlug')
  deleteEntry(@Param('idOrSlug') idOrSlug: number | string) {
    return this.entryService.deleteEntry(idOrSlug);
  }
}
