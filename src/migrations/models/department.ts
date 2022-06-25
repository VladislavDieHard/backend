import { PrismaService } from '../../prisma.service';
import { select } from '../select';
import { v4 } from 'uuid';
import { saveImage } from '../saveImage';
import { getConfig } from '../../utils/getConfig';

const prismaService = new PrismaService();
const config = getConfig();

export async function department() {
  const departments: OldDepartment[] = await select(
    `SELECT * FROM news_department`,
  );
  const existDepartments = await prismaService.department.findMany({});
  const departmentOldIds = existDepartments.map(
    (department) => department.oldId,
  );

  for (const department of departments) {
    if (!departmentOldIds.includes(department.id)) {
      const newId = v4();
      const oldId = department.id;
      let preview;

      if (department.image) {
        preview = await saveImage(
          `${config['OLD_URL_MEDIA']}${department.image}`,
        );
      }

      await prismaService.department.create({
        data: {
          id: newId,
          oldId,
          title: department.title,
          slug: department.slug,
          fileId: preview?.id,
        },
      });
    }
  }
}

type OldDepartment = {
  id: number;
  title: string;
  description: string;
  image: string;
  date_of_create: Date;
  date_of_edit: Date;
  slug: string;
};
