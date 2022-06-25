import { department } from './models/department';
import { rubric } from './models/rubric';
import { menu } from './models/menu';
import { menuItem } from './models/menuItem';
import { document } from './models/document';
import { entry } from './models/entry';
import { mainSlider } from './models/mainSlider';

export async function migrate() {
  await department();
  await rubric();
  await menu();
  await menuItem();
  await document();
  await entry();
  await mainSlider();
}
