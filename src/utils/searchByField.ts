import { parseValue } from './parsers';

export function searchByFieldValue(
  searchByField: string,
): { field: string; query: string } | undefined {
  if (searchByField) {
    const [key, value] = searchByField.split('=');
    return searchByField && key && value
      ? { field: key, query: parseValue(value) as string }
      : undefined;
  } else {
    return undefined;
  }
}
