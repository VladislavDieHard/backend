import { ApiProperty } from '@nestjs/swagger';

export class DepartmentUpdateDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  slug: string;
  @ApiProperty()
  isDeleted: boolean;
  @ApiProperty()
  fileId: string;
}
