import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { parseIdOrSlug } from '../../utils';
import { Affiche } from '@prisma/client';

@Injectable()
export class AfficheUpdateService {
  constructor(private prismaService: PrismaService) {}

  async updateAffiche(idOrSlug, newAffiche: Affiche): Promise<Affiche> {
    const parsedIdOrSlug = parseIdOrSlug(idOrSlug);
    return this.prismaService.affiche
      .update({
        where: {
          ...parsedIdOrSlug as undefined as any,
        },
        data: newAffiche,
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw new HttpException(
          err.meta.cause,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }
}
