import slugify from 'slugify';
import moment from 'moment';

export function createSlug(
  title: string,
  slug: string | undefined,
  slugWithDate = true,
) {
  let resultedSlug;

  if (slug) {
    resultedSlug = slug.toLowerCase();
  } else {
    resultedSlug = slugify(title, {
      replacement: '-',
      remove: /[^\w\s]/gi,
      lower: true,
      strict: false,
      locale: 'ru',
      trim: true,
    });
  }

  if (slugWithDate) {
    resultedSlug += `-${moment().format('HH-mm-DD-MM-YY')}`;
  }

  return resultedSlug;
}
