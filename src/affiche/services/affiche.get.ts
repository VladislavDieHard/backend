import { Injectable } from '@nestjs/common';
import { Affiche } from '@prisma/client';
import { GetService } from '../../commonServices/getService';

@Injectable()
export class AfficheGetService extends GetService {
  async getAffiches() {
    const count = await this.prismaService.affiche.count();

    return this.addOrderBy('eventDate')
      .addPagination(count)
      .executeFindMany('Affiche');
  }

  async getAffiche(idOrSlug): Promise<Affiche> {
    return this.parseIdOrSlug(idOrSlug).executeFindUnique('Affiche');
  }
}
