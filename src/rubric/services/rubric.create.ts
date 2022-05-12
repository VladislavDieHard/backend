import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { createSlug } from '../../utils';
import { Rubric } from '@prisma/client';
import { v4 } from 'uuid';

@Injectable()
export class RubricCreateService {
  constructor(private readonly prismaService: PrismaService) {}

  async createRubric(newRubric: Rubric) {
    newRubric.slug = createSlug(newRubric.title, newRubric.slug);

    return this.prismaService.rubric
      .create({
        data: {
          id: v4(),
          ...newRubric,
        },
      })
      .then((rubric) => rubric)
      .catch((err) => {
        throw new HttpException(err.meta, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }
}
