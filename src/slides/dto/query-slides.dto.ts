import { ApiProperty } from '@nestjs/swagger';

export class QuerySlideDto {
  @ApiProperty({ required: false })
  page: number;
  @ApiProperty({ required: false })
  pageSize: number;
  @ApiProperty({ required: false })
  orderBy: string;
  @ApiProperty({ required: false })
  include: string;
}

export class QuerySlideOneDto {
  @ApiProperty({ required: false })
  include: string;
}
