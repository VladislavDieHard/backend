import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { createSlug } from '../../utils';
import { Affiche } from '@prisma/client';
import { v4 } from 'uuid';

@Injectable()
export class AfficheCreateService {
  constructor(private prismaService: PrismaService) {}

  createAffiche(newAffiche: Affiche): Promise<Affiche> {
    newAffiche.slug = createSlug(newAffiche.title, newAffiche.slug);

    return this.prismaService.affiche
      .create({
        data: {
          id: v4(),
          ...newAffiche,
        },
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw new HttpException(err.meta.target, HttpStatus.BAD_REQUEST);
      });
  }
}
