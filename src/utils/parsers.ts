import { validate } from 'uuid';

export function parseIncludeArrString(arrString) {
  if (arrString == undefined) return undefined;
  const result = {};
  arrString.split(',').forEach((item) => {
    result[item] = true;
  });
  return result;
}

export function parseIdOrSlug(idOrSlug) {
  return {
    id: validate(idOrSlug) ? idOrSlug : undefined,
    slug: !validate(idOrSlug) ? idOrSlug : undefined,
  } as any;
}
