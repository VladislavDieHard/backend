import { ApiProperty } from '@nestjs/swagger';

export class EntryAllQueryDto {
  @ApiProperty({ required: false })
  fromDate: string;

  @ApiProperty({ required: false })
  toDate: string;
  
  @ApiProperty({ required: false })
  searchByField: string;
  @ApiProperty({ required: false })
  isDeleted: string;
  @ApiProperty({ required: false })
  pageSize: number;
  @ApiProperty({ required: false })
  orderBy: string;
  @ApiProperty({ required: false })
  include: string;
  @ApiProperty({ required: false })
  search: string;
  @ApiProperty({ required: false })
  page: number;
  @ApiProperty({ required: false })
  rubric: string;
  @ApiProperty({ required: false })
  department: string;
}

export class EntryOneQueryDto {
  @ApiProperty({ required: false })
  include: string;
}
