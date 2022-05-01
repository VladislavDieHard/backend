export enum MenuType {
  COMMON = 'COMMON',
  ABOUT = 'ABOUT',
  COLLEAGUES = 'COLLEAGUES',
  DOCUMENTS = 'DOCUMENTS',
}

export type GetMenusOptions = {
  type: MenuType;
};
