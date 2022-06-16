import { Injectable } from '@nestjs/common';
import { Affiche } from '@prisma/client';
import { GetService } from '../../commonServices/getService';

@Injectable()
export class AfficheGetService extends GetService {
  async getAffiches(options) {
    const count = await this.prismaService.affiche.count();

    return this.addOrderBy('eventDate')
      .addPagination(count)
      .executeFindMany('Affiche', options.path);
  }

  async getAffiche(idOrSlug): Promise<Affiche> {
    return this.executeFindUnique('Affiche', idOrSlug);
  }
}
