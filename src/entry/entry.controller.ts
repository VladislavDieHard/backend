import { EntryUpdateDto } from './dto/entry-update.dto';
import { EntryCreateDto } from './dto/entry-create.dto';
import { EntryAllQueryDto } from './dto/entry-query.dto';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EntryService } from './entry.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Entry')
@Controller('entry')
export class EntryController {
  constructor(private entryService: EntryService) {}

  @Post()
  create(@Body() newEntry: EntryCreateDto) {
    return this.entryService.create(newEntry);
  }

  @Get()
  findAll(@Query() query?: EntryAllQueryDto) {
    return this.entryService.findAll(query);
  }

  @Get('/pinned')
  findPinned() {
    return this.entryService.findPinned();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Query() query?: EntryAllQueryDto) {
    return this.entryService.findOne(id, query);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() newEntry: EntryUpdateDto) {
    return this.entryService.update(id, newEntry);
  }
}
