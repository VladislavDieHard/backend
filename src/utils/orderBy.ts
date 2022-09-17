export function createOrderBy(orderByString: string) {
  if (orderByString == undefined) return undefined;
  const result = {};
  if (orderByString[0] === '-') {
    result[orderByString.substring(1, orderByString.length)] = 'desc';
  } else {
    result[orderByString] = 'asc';
  }
  return result;
}
