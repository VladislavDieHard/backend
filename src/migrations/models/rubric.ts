import { PrismaService } from '../../prisma.service';
import { select } from '../select';
import { v4 } from 'uuid';
import { database } from '../db';

const prismaService = new PrismaService();

export async function rubric() {
  const rubrics: RubricOld[] = await select(
    database,
    `SELECT * FROM \`news_rubric\``,
  );
  const existRubrics = await prismaService.rubric.findMany({});
  const rubricIds = existRubrics.map((rubric) => rubric.oldId);

  for (const rubric of rubrics) {
    if (!rubricIds.includes(rubric.id)) {
      const newId = v4();
      const oldId = rubric.id;

      await prismaService.rubric.create({
        data: {
          id: newId,
          oldId,
          title: rubric.title,
          slug: rubric.slug,
        },
      });
    }
  }
}

type RubricOld = {
  id: number;
  title: string;
  date_of_create: Date;
  date_of_edit: Date;
  description: string;
  slug: string;
};
