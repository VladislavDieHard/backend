import { PrismaService } from '../../prisma.service';
import { select } from '../select';
import { v4 } from 'uuid';
import moment from 'moment';

const prismaService = new PrismaService();

export async function affiche() {
  const affiches: OldAffiche[] = await select(`SELECT * FROM news_affiche`);
  const existAffiche = await prismaService.affiche.findMany({});
  const departmentOldIds = existAffiche.map((affiche) => affiche.oldId);

  for (const affiche of affiches) {
    if (!departmentOldIds.includes(affiche.id)) {
      const newId = v4();
      const oldId = affiche.id;

      if (affiche.phone) {
        affiche.phone = affiche.phone.trim();
      }

      await prismaService.affiche.create({
        data: {
          id: newId,
          oldId,
          eventDate: moment(affiche.date_of_event, 'YYYY:MM:DD').toDate(),
          eventTime: moment(affiche.start_time, 'hh:mm:ss').toDate(),
          eventPlace: affiche.event_space,
          title: affiche.title.trim(),
          desc: affiche.description.trim(),
          slug: affiche.slug.trim(),
          phone: affiche.phone,
        },
      });
    }
  }
}

type OldAffiche = {
  id: number;
  title: string;
  description: string;
  phone: string;
  start_time: Date;
  age: number;
  date_of_event: Date;
  date_of_create: Date;
  date_of_edit: Date;
  slug: string;
  event_space: string;
};
