import slugify from 'slugify';
import moment from 'moment';

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

  resultedSlug += `-${moment().format('HH:mm-DD.MM.YY')}`;

  return resultedSlug;
}
