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
    id: !isNaN(Number(idOrSlug)) ? Number(idOrSlug) : undefined,
    slug: isNaN(Number(idOrSlug)) ? idOrSlug : undefined,
  } as any;
}
