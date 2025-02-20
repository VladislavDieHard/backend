import { Module } from '@nestjs/common';
import { EventWarService } from './event-war.service';
import { EventWarController } from './event-war.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [EventWarService, PrismaService],
  controllers: [EventWarController],
})
export class EventWarModule {}
