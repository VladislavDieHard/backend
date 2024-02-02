import { ApiProperty } from '@nestjs/swagger';

export class DepartmentQueryDto {
  @ApiProperty()
  pageSize: number;
  @ApiProperty()
  page: number;
  @ApiProperty()
  include: string;
  @ApiProperty()
  orderBy: string;
  @ApiProperty()
  isDeleted: string;
}
