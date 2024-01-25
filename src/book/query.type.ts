import { ApiProperty, ApiTags } from '@nestjs/swagger';

export class BookQuery {
  @ApiProperty({ required: false })
  include: string;

  @ApiProperty({ required: false, default: '-createdAt' })
  orderBy: string;

  @ApiProperty({ required: false, default: '1' })
  page: number;

  @ApiProperty({ required: false, default: '10' })
  pageSize: number;
}
