import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MetadataDto } from './common.dto';

@ApiTags('Common')
@Controller()
export class AppController {
  constructor(private prismaService: PrismaService) {}

  @ApiOperation({
    summary: 'Возвращает метаданные всех моделей',
  })
  @ApiResponse({
    status: 200,
    description: 'Возвращает метаданные всех моделей',
    type: MetadataDto,
  })
  @Get('/m*a')
  getMetadata() {
    return (this.prismaService as any)._dmmf.datamodel;
  }
}
