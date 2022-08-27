export type MultiResponse<T> = {
  data: T;
  meta: {
    page: number;
    pages: number;
    pageSize: number;
  };
};
