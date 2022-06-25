import { department } from './models/department';
import { mainSlider } from './models/mainSlider';
import { menuItem } from './models/menuItem';
import { document } from './models/document';
import { affiche } from './models/affiche';
import { rubric } from './models/rubric';
import { entry } from './models/entry';
import { menu } from './models/menu';

export async function migrate() {
  await department();
  await affiche();
  await rubric();
  await menu();
  await menuItem();
  await document();
  await entry();
  await mainSlider();
}
