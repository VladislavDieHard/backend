export enum MenuType {
  COMMON = 'COMMON',
  ABOUT = 'ABOUT',
  COLLEAGUES = 'COLLEAGUES',
  DOCUMENTS = 'DOCUMENTS',
}

export type GetMenusOptions = {
  include: string | undefined;
  searchByField: string;
  isDeleted?: string;
};
