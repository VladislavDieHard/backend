import { ApiProperty } from '@nestjs/swagger';

export class CollectionQueryDto {
  @ApiProperty({ required: false })
  include: string;

  @ApiProperty({ required: false })
  isDeleted: string;

  @ApiProperty({ required: false })
  orderBy: string;
}
