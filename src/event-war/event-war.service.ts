import { Injectable } from '@nestjs/common';
import { CreateEventWarDto } from './dto/create-event-war.dto';
import { UpdateEventWarDto } from './dto/update-event-war.dto';
import { PrismaService } from '../prisma.service';
import { v4 } from 'uuid';

@Injectable()
export class EventWarService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createEventWarDto: CreateEventWarDto) {
    return this.prismaService.eventWar.create({ data: createEventWarDto });
  }

  findAll() {
    return `This action returns all eventWar`;
  }

  findOne(id: number) {
    return `This action returns a #${id} eventWar`;
  }

  update(id: number, updateEventWarDto: UpdateEventWarDto) {
    return `This action updates a #${id} eventWar`;
  }

  remove(id: number) {
    return `This action removes a #${id} eventWar`;
  }
}
