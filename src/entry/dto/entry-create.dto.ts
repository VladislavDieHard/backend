import { ApiProperty } from '@nestjs/swagger';

export class EntryCreateDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  desc: string;
  @ApiProperty()
  content: string;
  @ApiProperty()
  slug: string;
  @ApiProperty()
  isDeleted: boolean;
  @ApiProperty()
  rubrics: string[];
  @ApiProperty()
  fileId: string;
  @ApiProperty()
  publishedAt: Date;
  @ApiProperty()
  departmentId: string;
}
