export function createPagination(
  count: number,
  page?: number,
  pageSize?: number,
) {
  const result = {};
  result[page] = page ? page : 1;
  result[pageSize] = pageSize ? pageSize : 10;

  return {
    page: page,
    total: count,
    pageSize: pageSize,
  };
}
