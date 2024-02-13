import { ApiProperty } from '@nestjs/swagger';

export class QueryMenuItemDto {
  @ApiProperty({ required: false })
  page: number;
  @ApiProperty({ required: false })
  pageSize: number;
  @ApiProperty({ required: false })
  isDeleted: string;
  @ApiProperty({ required: false })
  menuId: string;
  @ApiProperty({ required: false })
  include: string;
}
