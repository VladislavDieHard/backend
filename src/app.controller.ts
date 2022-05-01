import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Controller()
export class AppController {
  constructor(private prismaService: PrismaService) {}

  @Get('/m*a')
  getMetadata() {
    return (this.prismaService as any)._dmmf.datamodel;
  }
}
