import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Common')
@Controller()
export class AppController {
  constructor(private prismaService: PrismaService) {}

  @ApiResponse({
    status: 200,
    description: 'Возвращает метаданные всех моделей',
  })
  @ApiOperation({
    summary: 'Возвращает метаданные всех моделей',
  })
  @Get('/m*a')
  getMetadata() {
    return (this.prismaService as any)._dmmf.datamodel;
  }
}
