export function createPagination(options) {
  const page = options.page ? options.page : 1;
  const pageSize = options.pageSize || 10;
  const pages =
    options.count > pageSize ? Math.trunc(options.count / pageSize) + 1 : 1;

  return {
    pageSize: pageSize,
    pages: pages,
    page: page,
  };
}
