import moment from 'moment';
import axios from 'axios';
import { parse } from 'node-html-parser';
import { v4 } from 'uuid';
import { saveImage } from './saveImage';
import { PrismaService } from '../prisma.service';
import { createSlug } from '../utils';

const urlRegex = /http:\/\/infomania.ru\/new\/view.php\?id=([0-9]+)/gm;
const prismaService = new PrismaService();

export async function parseHtml(html: string) {
  const root = parse(html);

  const images: any = root.getElementsByTagName('img');
  for (const image of images) {
    const src = image.getAttribute('src');
    if (!src.includes('dev.infomania.ru')) {
      if (src && typeof src === 'string') {
        const newSrc = await replaceImagePath(src);
        image.removeAttribute('src');
        image.setAttribute('src', newSrc);
      }
    }
  }
  return root.toString();
}

// async function executeAllRelatedLinks(html: string) {
//   const root = parse(html);
//   const title = root.querySelector('.title_link').innerHTML;
//   const existsEntry = await prismaService.entry.findFirst({
//     where: {
//       title: title,
//     },
//   });
//   if (!existsEntry) {
//     const department = await prismaService.department.findUnique({
//       where: {
//         title: 'Администрация',
//       },
//     });
//     const textDate = root.getElementsByTagName('i');
//     const date =
//       textDate.length > 0 && textDate[0]
//         ? moment(textDate[0].innerHTML, 'DD-MM-YYYY').toDate()
//         : moment('2010-01-01T00:00:00.000').toDate();
//
//     const content = await parseHtml(html);
//
//     const newEntry = await prismaService.entry.create({
//       data: {
//         id: v4(),
//         title: title,
//         content: content,
//         published: true,
//         createdAt: date,
//         updatedAt: date,
//         publishedAt: date,
//         departmentId: department.id,
//         slug: createSlug(title, undefined, true),
//       },
//     });
//
//     return `/entry/${newEntry.slug}`;
//   } else {
//     return `/entry/${existsEntry.slug}`;
//   }
// }

async function replaceImagePath(src) {
  const result = await saveImage(src.substring(7, src.length));
  if (!result) return null;
  return result.path;
}
