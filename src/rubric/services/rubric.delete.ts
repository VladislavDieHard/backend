import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { parseIdOrSlug } from '../../utils';

@Injectable()
export class RubricDeleteService {
  constructor(private readonly prismaService: PrismaService) {}

  async deleteRubric(idOrSlug) {
    const parsedIdOrSlug = parseIdOrSlug(idOrSlug);

    return this.prismaService.rubric
      .delete({
        where: parsedIdOrSlug as undefined as any,
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
