import { ApiProperty } from '@nestjs/swagger';

export class DepartmentDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  slug: string;
}
