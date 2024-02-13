import { ApiProperty } from '@nestjs/swagger';

export class QueryEntryDto {
  @ApiProperty({ required: false })
  page: number;
  @ApiProperty({ required: false })
  pageSize: number;
  @ApiProperty({ required: false })
  isDeleted: string;
}
