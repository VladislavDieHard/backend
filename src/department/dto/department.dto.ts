import { ApiProperty } from '@nestjs/swagger';
import { EntryDto } from '../../entry/dto/entry.dto';
import { PaginationDto } from '../../common.dto';

export class DepartmentDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  slug: string;
}

export class DepartmentEntriesDto {
  @ApiProperty({
    isArray: true,
    type: EntryDto,
  })
  data: EntryDto[];
  @ApiProperty({
    type: PaginationDto,
  })
  meta: {
    pages: number;
    pageSize: number;
    nextPage: string;
    prevPage: string;
  };
}
