import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuItemDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  menuId: string;
  @ApiProperty()
  slug: string;
  @ApiProperty()
  isDeleted: boolean;
  @ApiProperty()
  menuItemType: menuItemType;
  @ApiProperty()
  link?: string;
}

enum menuItemType {
  DOCUMENT = 'DOCUMENT',
  LINK = 'LINK',
}
