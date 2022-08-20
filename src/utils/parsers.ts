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

export function parseSearch(fields: string[], searchString: string) {
  if (fields && searchString) {
    return {
      OR: fields.map((field) => {
        return { [field]: { equals: searchString } };
      }),
    };
  } else {
    return undefined;
  }
}

export function parseModelName(name: string) {
  return name
    .split(/(?=[A-Z])/)
    .join('-')
    .toLowerCase();
}

export function parseValue(value: string): any {
  if (!isNaN(Number(value))) {
    return Number(value);
  } else if (value === 'true' || value === 'false') {
    return value === 'true';
  } else {
    return value;
  }
}
