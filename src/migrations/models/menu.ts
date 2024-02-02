import { PrismaService } from '../../prisma.service';
import { select } from '../select';
import { v4 } from 'uuid';
import { database } from '../db';

const prismaService = new PrismaService();

const commonMenus = [
  'Услуги',
  'Общение и творчество',
  'Библиотека онлайн',
  'Ресурсы',
];

const aboutMenus = ['Библиотека сегодня', 'История', 'Социальные сети'];

const colleaguesMenus = [
  'Издания',
  'Мероприятия',
  'Профессиональные объединения',
  'Проекты 2022',
];

const documentsMenus = [
  'Основные документы',
  'Управление качеством',
  'Политика библиотеки',
];

export async function menu() {
  const excludeIds = [1, 2, 3, 4, 5];
  const menus = await select(
    database,
    `SELECT * FROM news_menu WHERE id NOT IN (${excludeIds})`,
  );
  const existedMenus = await prismaService.menu.findMany({});
  const menuOldIds = existedMenus.map((menu) => menu.oldId);

  for (const menu of menus) {
    if (!menuOldIds.includes(menu.id)) {
      const menuType = findMenuType(menu.title);
      const newId = v4();
      const oldId = menu.id;

      if (menuType) {
        await prismaService.menu.create({
          data: {
            id: newId,
            oldId,
            title: menu.title,
            menuType: menuType,
          },
        });
      }
    }
  }
}

function findMenuType(title) {
  if (commonMenus.includes(title)) {
    return 'COMMON';
  } else if (aboutMenus.includes(title)) {
    return 'ABOUT';
  } else if (colleaguesMenus.includes(title)) {
    return 'COLLEAGUES';
  } else if (documentsMenus.includes(title)) {
    return 'DOCUMENTS';
  } else return null;
}
