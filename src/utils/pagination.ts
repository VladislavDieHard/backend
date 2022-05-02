export function createPagination(options) {
  const pageSize = options.pageSize || 10;
  const pages =
    options.count > options.pageSize
      ? Math.trunc(options.count / options.pageSize) + 1
      : 1;

  return {
    pageSize: pageSize,
    pages: pages,
  };
}
