import { Injectable } from '@nestjs/common';
import { GetService } from '../../commonServices/getService';
import { File } from '@prisma/client';
import { FileTypes } from '../../utils/findFileType';

@Injectable()
export class FileGetService extends GetService {
  async getFiles(options): Promise<FileTypes> {
    return this.addPagination(options.pageSize, options.page)
      .addSearchByFieldValue(options.searchByField)
      .addOrderBy(options.orderBy)
      .executeFindMany('File');
  }

  async getFile(idOrSlug): Promise<File> {
    return this.executeFindUnique('File', idOrSlug);
  }
}
