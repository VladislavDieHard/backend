import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class CommonDto {
  @ApiProperty({
    enumName: 'HttpStatus',
  })
  status: HttpStatus.INTERNAL_SERVER_ERROR;
  @ApiProperty()
  message: string;
}

export class MetaDto {
  @ApiProperty()
  pages: number;
  @ApiProperty()
  pageSize: number;
  @ApiProperty()
  nextPage: string;
  @ApiProperty()
  prevPage: string;
}
