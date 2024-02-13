import { ApiProperty } from '@nestjs/swagger';

export class CreateRubricDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  desc: string;
  @ApiProperty()
  slug: string;
  @ApiProperty()
  isDeleted: boolean;
}
