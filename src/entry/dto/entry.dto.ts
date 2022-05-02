import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class EntryDto {
  @ApiProperty()
  id: number;
  @ApiPropertyOptional()
  preview: string | null;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  publishedAt: Date;
  @ApiProperty()
  title: string;
  @ApiPropertyOptional()
  desc: string | null;
  @ApiPropertyOptional()
  content: string | null;
  @ApiProperty()
  slug: string;
  @ApiProperty({ default: false })
  published: boolean;
  @ApiProperty()
  departmentId: number;
  @ApiPropertyOptional()
  rubricId: number | null;
  @ApiPropertyOptional()
  afficheId: number | null;
}
