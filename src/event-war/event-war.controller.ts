import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EventWarService } from './event-war.service';
import { CreateEventWarDto } from './dto/create-event-war.dto';
import { UpdateEventWarDto } from './dto/update-event-war.dto';

@Controller('eventWar')
export class EventWarController {
  constructor(private readonly eventWarService: EventWarService) {}

  @Post()
  create(@Body() createEventWarDto: CreateEventWarDto) {
    return this.eventWarService.create(createEventWarDto);
  }

  @Get()
  findAll() {
    return this.eventWarService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventWarService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEventWarDto: UpdateEventWarDto,
  ) {
    return this.eventWarService.update(+id, updateEventWarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventWarService.remove(+id);
  }
}
