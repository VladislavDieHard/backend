import { MenuItemType } from '@prisma/client';

export type MenuItemOptions = {
  searchByField: string;
  searchString: string | MenuItemType;
  includes: string | undefined;
};
