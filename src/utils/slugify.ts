import slugify from 'slugify';
import dayjs from 'dayjs';

export function createSlug(title: string, slug: string | undefined) {
  let resultedSlug;

  if (slug) {
    resultedSlug = slug.toLowerCase();
  } else {
    resultedSlug = slugify(title, {
      replacement: '-',
      remove: undefined,
      lower: true,
      strict: false,
      locale: 'ru',
      trim: true,
    });
  }

  resultedSlug += `-${dayjs().format('mm-HH-DD-MM-YY')}`;

  return resultedSlug;
}
