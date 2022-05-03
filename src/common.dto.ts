import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ErrorDto {
  @ApiProperty({
    enumName: 'HttpStatus',
  })
  status: HttpStatus.INTERNAL_SERVER_ERROR;
  @ApiProperty()
  message: string;
}

export class PaginationDto {
  @ApiProperty()
  pages: number;
  @ApiProperty()
  pageSize: number;
  @ApiProperty()
  nextPage: string;
  @ApiProperty()
  prevPage: string;
}

export class MetadataEnumValuesDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  dbName: string | null;
}

export class MetadataEnumDto {
  @ApiProperty()
  name: string;
  @ApiProperty({
    isArray: true,
    type: MetadataEnumValuesDto,
  })
  values: MetadataEnumValuesDto[];
}

export class ModelFieldDefaultDto {
  @ApiProperty()
  name: string;
  @ApiProperty({ isArray: true })
  args: [];
}

export class ModelFieldsDto {
  @ApiProperty()
  name: 'id';
  @ApiProperty()
  kind: 'scalar';
  @ApiProperty()
  isList: boolean;
  @ApiProperty()
  isRequired: boolean;
  @ApiProperty()
  isUnique: boolean;
  @ApiProperty()
  isId: boolean;
  @ApiProperty()
  isReadOnly: boolean;
  @ApiProperty()
  type: string;
  @ApiProperty()
  hasDefaultValue: boolean;
  @ApiProperty({
    isArray: true,
    type: ModelFieldDefaultDto,
  })
  default: ModelFieldDefaultDto[];
  @ApiProperty()
  isGenerated: boolean;
  @ApiProperty()
  isUpdatedAt: boolean;
}

export class ModelDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  dbName: string | null;
  @ApiProperty({
    isArray: true,
    type: ModelFieldsDto,
  })
  fields: ModelFieldsDto;
}

export class MetadataDto {
  @ApiProperty({
    isArray: true,
    type: MetadataEnumDto,
  })
  enums: MetadataEnumDto[];
  @ApiProperty()
  dbName: string | null;
  @ApiProperty({
    isArray: true,
    type: ModelDto,
  })
  models: ModelDto[];
}
