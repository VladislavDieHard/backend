import { PrismaService } from '../../prisma.service';
import { select } from '../select';
import { v4 } from 'uuid';
import { createSlug } from '../../utils';

const prismaService = new PrismaService();

const MenuItemTypes = {
  e: 'DOCUMENT',
  o: 'LINK',
};

export async function menuItem() {
  const menuItems: MenuItemOld[] = await select(
    `SELECT * FROM news_menuitem WHERE is_deleted != '1'`,
  );
  const existsMenuItems = await prismaService.menuItem.findMany({});
  const menuItemIds = existsMenuItems.map((menuItem) => menuItem.oldId);

  for (const menuItem of menuItems) {
    const oldId = menuItem.id;
    if (!menuItemIds.includes(oldId)) {
      const newId = v4();
      const menuItemType = MenuItemTypes[menuItem.link_type];
      const menu = await prismaService.menu.findFirst({
        where: {
          oldId: menuItem.menu_id,
        },
      });

      if (menuItemType && menu) {
        const menuItemToSave = {
          id: newId,
          oldId,
          title: menuItem.title,
          menuItemType: menuItemType,
          link: menuItem.link,
          menuId: menu.id,
          slug: createSlug(menuItem.title, undefined, false),
        };

        await prismaService.menuItem.create({
          data: menuItemToSave,
        });
      }
    }
  }
}

type MenuItemOld = {
  id: number;
  title: string;
  description: string;
  link: string;
  date_of_create: Date;
  date_of_edit: Date;
  link_type: string;
  menu_id: number;
};
