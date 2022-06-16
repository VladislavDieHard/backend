export function createPagination(options) {
  const page = options.page ? parseInt(options.page) : 1;
  const pageSize = options.pageSize;
  const prevPageSize = Math.floor(options.count / pageSize);

  let pages;
  if (options.count % pageSize) {
    pages = options.count > pageSize ? prevPageSize + 1 : 1;
  } else {
    pages = options.count > pageSize ? prevPageSize : 1;
  }

  return {
    pageSize: pageSize,
    pages: pages,
    page: page,
  };
}
