import { PrismaService } from '../../prisma.service';
import { v4 } from 'uuid';
import { count, select } from '../select';
import { saveImage } from '../saveImage';
import { parseHtml } from '../parseHtml';
import { getConfig } from '../../utils/getConfig';

const prismaService = new PrismaService();
const config = getConfig();

export async function entry() {
  const entriesCount = await count('news_entry');
  const limit = 50;
  const departments = await prismaService.department.findMany({});
  const departmentIds = departments.map((department) => {
    return { oldId: department.oldId, id: department.id };
  });
  const rubrics = await prismaService.rubric.findMany({});
  const rubricIds = rubrics.map((rubric) => {
    return { oldId: rubric.oldId, id: rubric.id };
  });
  const documents = await prismaService.document.findMany({});
  const documentIds = documents.map((doc) => doc.oldId);

  for (let i = 0; i <= entriesCount; ) {
    const entries: OldEntry[] = await select(
      `SELECT * FROM news_entry WHERE id NOT IN (${documentIds}) LIMIT ${limit} OFFSET ${i}`,
    );

    for (const entry of entries) {
      const existEntry = await prismaService.entry.findFirst({
        where: {
          oldId: entry.id,
        },
      });

      if (!existEntry) {
        await executeEntry(entry, departmentIds, rubricIds);
      }
    }

    if (i === entriesCount) break;
    if (i + limit > entriesCount) {
      i = i + (entriesCount - i);
    } else {
      i += limit;
    }
  }
}

async function executeEntry(entry: OldEntry, departmentIds, rubricIds) {
  const departmentEntryId = await select(
    `SELECT * FROM news_entry_department WHERE entry_id = ${entry.id}`,
  );
  const rubricEntryId = await select(
    `SELECT * FROM news_entry_rubric WHERE entry_id = ${entry.id}`,
  );

  let newRubricId;
  if (rubricEntryId.length > 0) {
    const rubricOldId = rubricEntryId?.[0]?.['rubric_id'];
    newRubricId = rubricIds.find((item) => {
      if (!rubricOldId) console.log(rubricOldId);
      return item.oldId === rubricOldId;
    });
  } else {
    console.log(`Нет связи с rubric у новости с id: ${entry.id}`);
  }

  let newDepartmentId;
  if (departmentEntryId.length > 0) {
    const departmentOldId = departmentEntryId?.[0]?.['department_id'];
    newDepartmentId = departmentIds.find((item) => {
      if (!departmentOldId) console.log(departmentEntryId);
      return item.oldId === departmentOldId;
    });
  } else {
    console.log(`Нет связи с department у новости с id: ${entry.id}`);
  }

  if (newDepartmentId) {
    let preview;
    if (entry.preview) {
      console.log(entry.preview);
      preview = await saveImage(
        `${config['OLD_URL_MEDIA']}${entry.preview}`,
        new Date(entry.date_of_create),
      );
    }

    const content = await parseHtml(entry.text, entry.date_of_create);

    prismaService.entry
      .create({
        data: {
          id: v4(),
          oldId: entry.id,
          title: entry.title,
          desc: entry.description,
          content: content,
          slug: entry.slug,
          published: true,
          createdAt: new Date(entry.date_of_create),
          updatedAt: new Date(entry.date_of_edit),
          publishedAt:
            entry.date_of_create &&
            String(entry.date_of_public) !== '0000-00-00'
              ? new Date(entry.date_of_public)
              : new Date(entry.date_of_create),
          departmentId: newDepartmentId.id,
          rubricId: newRubricId?.id,
          fileId: preview?.id,
        },
      })
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        // console.log(err);
        // console.log(
        //   `Что-то пошло не так с сохранением нвости с id: ${entry.id}`,
        // );
      });
  }
}

type OldEntry = {
  id: number;
  title: string;
  description: string;
  text: string;
  slug: string;
  preview: string;
  date_of_create: Date;
  date_of_edit: Date;
  date_of_public: Date;
};
