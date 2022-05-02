import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Entry } from '@prisma/client';
import { v4 } from 'uuid';

@Injectable()
export class EntryCreateService {
  constructor(private prismaService: PrismaService) {}

  async createEntry(newEntry: Entry) {
    newEntry.slug = newEntry.slug.toLowerCase();
    try {
      return await this.prismaService.entry.create({
        data: {
          id: v4(),
          ...newEntry,
        },
      });
    } catch {
      throw new HttpException('Error with data', HttpStatus.BAD_REQUEST);
    }
  }
}
