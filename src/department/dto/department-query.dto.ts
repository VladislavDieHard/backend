import { ApiProperty } from '@nestjs/swagger';

export class DepartmentQueryDto {
  @ApiProperty({ required: false })
  pageSize: number;
  @ApiProperty({ required: false })
  page: number;
  @ApiProperty({ required: false })
  include: string;
  @ApiProperty({ required: false })
  orderBy: string;
  @ApiProperty({ required: false })
  isDeleted: string;
}
