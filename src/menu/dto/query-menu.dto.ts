export class QueryMenuDto {
  include: string;
  type: types;
  pageSize: number;
  page: number;
}

enum types {
  COMMON,
  ABOUT,
  COLLEAGUES,
  DOCUMENTS,
}
