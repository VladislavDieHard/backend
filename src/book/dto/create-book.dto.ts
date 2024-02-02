import { ApiProperty } from '@nestjs/swagger';
export class CreateBookDto {
  @ApiProperty({ description: 'Название книги' })
  title: string;
  @ApiProperty({ description: 'Название книги' })
  desc: string;
  @ApiProperty({ description: 'Название книги' })
  content: string;
  @ApiProperty({ description: 'Название книги' })
  fileId: string;
}
