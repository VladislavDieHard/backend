import { PrismaService } from '../../prisma.service';
import { select } from '../select';
import { v4 } from 'uuid';
import { saveImage } from '../saveImage';
import { getConfig } from '../../utils/getConfig';

const prismaService = new PrismaService();
const config = getConfig();

export async function mainSlider() {
  const mainSliders = await select(
    `SELECT * FROM main_slider WHERE is_deleted != '1'`,
  );
  const existMainSlider = await prismaService.mainSlider.findMany({});
  const mainSliderIds = existMainSlider.map((slide) => slide.oldId);

  for (const mainSlider of mainSliders) {
    const oldId = mainSlider.id;
    if (!mainSliderIds.includes(oldId)) {
      const entry = await prismaService.entry.findFirst({
        where: {
          oldId: mainSlider.entry_id,
        },
      });
      const newId = v4();

      let preview;

      if (mainSlider['full_size_image']) {
        preview = await saveImage(
          `${config['OLD_URL_MEDIA']}${mainSlider['full_size_image']}`,
        );
      }

      if (entry) {
        const mainSliderToSave = {
          id: newId,
          oldId,
          title: mainSlider.title,
          desc: mainSlider.description,
          entryId: entry.id,
          fileId: preview?.id,
        };

        await prismaService.mainSlider.create({
          data: mainSliderToSave,
        });
      }
    }
  }
}
