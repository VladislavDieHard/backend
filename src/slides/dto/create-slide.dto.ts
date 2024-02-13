import { ApiProperty } from '@nestjs/swagger';

export class CreateSlideDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  desc: string;
  @ApiProperty()
  fileId: string;
  @ApiProperty()
  isDeleted: string;
  @ApiProperty()
  url?: string;
  @ApiProperty()
  entryId?: string;
}
