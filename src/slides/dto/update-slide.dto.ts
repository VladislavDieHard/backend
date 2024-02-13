import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateSlideDto } from './create-slide.dto';

export class UpdateSlideDto extends PartialType(CreateSlideDto) {
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
