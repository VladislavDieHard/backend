import { MenuItemType } from '@prisma/client';

export type MenuItemOptions = {
  menuItemType: MenuItemType;
  includes: string | undefined;
};
