import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FileDto {
  @ApiProperty()
  id: string;
  @ApiPropertyOptional()
  originalName: string | null;
  @ApiProperty()
  mimeType: string;
  @ApiProperty()
  hash: string;
  @ApiProperty()
  path: string;
  @ApiProperty()
  preview: string;
  @ApiProperty()
  createdAt: Date;
  @ApiPropertyOptional()
  Entry: string | null;
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
