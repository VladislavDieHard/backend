export type ServiceArgs = {
  searchByField: string;
  include: string | undefined;
  page: number;
  pageSize: number;
  isDeleted?: string;
};
