import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { parseIdOrSlug } from '../../utils';
import { Affiche } from '@prisma/client';

@Injectable()
export class AfficheGetService {
  constructor(private prismaService: PrismaService) {}

  async getAffiches(): Promise<Affiche[]> {
    return this.prismaService.affiche
      .findMany({
        orderBy: { eventDate: 'asc' },
      })
      .catch((affiches) => affiches)
      .catch((err) => {
        throw new HttpException(
          err.meta.cause,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }

  async getAffiche(idOrSlug): Promise<Affiche> {
    const parsedIdOrSlug = parseIdOrSlug(idOrSlug);
    return this.prismaService.affiche
      .findUnique({
        where: {
          ...parsedIdOrSlug,
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
