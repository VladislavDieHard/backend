import { validate } from 'uuid';

export function parseIncludeArrString(arrString) {
  if (arrString == undefined) return undefined;
  if (arrString === 'menuItems') {
    const result = {};
    arrString.split(',').forEach((item) => {
      result[item] = {
        orderBy: [{ position: 'asc' }],
      };
    });
    return result;
  }
  const result = {};
  arrString.split(',').forEach((item) => {
    result[item] = true;
  });
  console.log(result);
  return result;
}

export function parseIdOrSlug(
  idOrSlug: string,
  isId?: boolean,
): { [key: string]: string } {
  if (isId || validate(idOrSlug)) {
    return { id: idOrSlug };
  } else {
    return { slug: idOrSlug };
  }
}

export function parseSearch(fields: string[], searchString: string) {
  if (fields && searchString) {
    return {
      OR: fields.map((field) => {
        return { [field]: { contains: searchString } };
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
