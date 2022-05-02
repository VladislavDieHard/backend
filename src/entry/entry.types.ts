import { Entry } from '@prisma/client';

export type GetEntriesResponse = {
  data: Entry[];
  meta: {
    pages: number;
    pageSize: number;
    nextPage: string;
    prevPage: string;
  };
};
