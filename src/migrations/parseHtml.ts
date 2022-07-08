import { parse } from 'node-html-parser';
import { saveImage } from './saveImage';

const oldSiteUrlRegex = /http:\/\/infomania.ru\/new\/view.php\?id=([0-9]+)/gm;
const newSiteImgRegExp = new RegExp(
  /\/media\/uploads\/([0-9a-zA-Z\/_-]+)\.([a-zA-Z]+)/,
);
const oldSiteImgRegExp = new RegExp(
  /http:\/\/infomania.ru\/([a-zA-Z0-9_\/ ]+)\.([a-zA-Z]+)/g,
);
const base64Image = new RegExp(
  /data:image\/(gif|jpg|jpeg|png|webp|svg|ico+);base64,([a-zA-Z0-9+/]+)/,
);
const otherImageUrls = new RegExp(
  /(http|https):\/\/([a-zA-Z.\/_0-9]+)\.(gif|jpg|jpeg|png|webp|svg|ico)/,
);

export async function parseHtml(html: string, date) {
  const root = parse(html);

  const images: any = root.getElementsByTagName('img');
  for (const image of images) {
    const src = image.getAttribute('src').trim();

    let newSrc;
    if (newSiteImgRegExp.test(src)) {
      newSrc = await saveImage(`http://dev.infomania.ru${src}`, new Date(date));
    }

    if (oldSiteImgRegExp.test(src)) {
      newSrc = await saveImage(src, new Date(date));
    }

    if (base64Image.test(src)) {
      newSrc = await saveImage(src, new Date(date), true);
    }

    if (otherImageUrls.test(src)) {
      newSrc = await saveImage(src, new Date(date));
    }

    if (newSrc?.path) {
      image.removeAttribute('src');
      image.setAttribute('src', newSrc.path);
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
