import { Entry } from '@prisma/client';

export type GetDepartmentEntriesResponse = {
  data: Entry[];
  meta: {
    pages: number;
    pageSize: number;
    nextPage: string;
    prevPage: string;
  };
};
