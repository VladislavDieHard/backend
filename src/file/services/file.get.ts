import { Injectable } from '@nestjs/common';
import { GetService } from '../../commonServices/getService';
import { File } from '@prisma/client';

@Injectable()
export class FileGetService extends GetService {
  async getFile(idOrSlug): Promise<File> {
    return this.executeFindUnique('File', idOrSlug);
  }
}
