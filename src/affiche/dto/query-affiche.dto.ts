import { ApiProperty } from '@nestjs/swagger';

export class QueryAfficheDto {
  @ApiProperty({ required: false })
  pageSize: number;
  @ApiProperty({ required: false })
  page: number;
  @ApiProperty({ required: false })
  inclued: string;
  @ApiProperty({ required: false })
  isDeleted: string;
  @ApiProperty({ required: false })
  orderBy: string;
  @ApiProperty({ required: false })
  fromDate: string;
  @ApiProperty({ required: false })
  toDate: string;
}
