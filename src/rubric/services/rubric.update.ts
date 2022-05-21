import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { parseIdOrSlug } from '../../utils';
import { Rubric } from '@prisma/client';

@Injectable()
export class RubricUpdateService {
  constructor(private readonly prismaService: PrismaService) {}

  async updateRubric(newRubric: Rubric, idOrSlug: string) {
    const parsedIdOrSlug = parseIdOrSlug(idOrSlug);

    return this.prismaService.rubric
      .update({
        where: parsedIdOrSlug,
        data: newRubric,
      })
      .then((rubric) => rubric)
      .catch((err) => {
        throw new HttpException(
          err.meta.cause,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }
}
