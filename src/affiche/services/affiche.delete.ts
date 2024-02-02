import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Affiche } from '@prisma/client';
import { parseIdOrSlug } from '../../utils';

@Injectable()
export class AfficheDeleteService {
  constructor(private prismaService: PrismaService) {}

  async deleteAffiche(idOrSlug): Promise<Affiche> {
    const parsedIdOrSlug = parseIdOrSlug(idOrSlug);
    return this.prismaService.affiche
      .delete({
        where: {
          ...(parsedIdOrSlug as undefined as any),
        },
      })
      .then((affiche) => affiche)
      .catch((err) => {
        throw new HttpException(
          err.meta.cause,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }
}
