import { ApiProperty } from '@nestjs/swagger';
import { MenuItem } from '@prisma/client';
import { MenuType } from '../menu.types';

export class MenuDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty({ enum: MenuType })
  menuType: MenuType;
  @ApiProperty()
  menuItems: MenuItem[];
}
