import { ApiProperty } from '@nestjs/swagger';

export class UpdateAfficheDto {
  @ApiProperty()
  eventDate: string;
  @ApiProperty()
  eventTime: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  desc: string;
  @ApiProperty()
  eventPlace: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  isDeleted: boolean;
  @ApiProperty()
  entryId: string;
}
