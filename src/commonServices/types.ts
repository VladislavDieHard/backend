import {
  User,
  Department,
  Entry,
  Document,
  Affiche,
  Rubric,
  Menu,
  MenuItem,
  MainSlider,
  File,
} from '@prisma/client';

export type MultiResponse<T> = {
  data: T;
  meta: {
    page: number;
    pages: number;
    pageSize: number;
  };
};

export enum ModelsEnum {
  User = 'user',
  Department = 'department',
  Entry = 'entry',
  Document = 'document',
  Affiche = 'affiche',
  Rubric = 'rubric',
  Menu = 'menu',
  MenuItem = 'menuItem',
  MainSlider = 'mainSlider',
  File = 'file',
}

export type ModelData = User &
  Department &
  Entry &
  Document &
  Affiche &
  Rubric &
  Menu &
  MenuItem &
  MainSlider &
  File;

export type ModelsDataType = {
  [key in ModelsEnum]: ModelData;
};

export type ModelKey = keyof ModelsEnum;
