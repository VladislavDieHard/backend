import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import { Rubric } from '@prisma/client';
import { v4 } from 'uuid';
import slugify from "slugify";

@Injectable()
export class RubricCreateService {
  constructor(private readonly prismaService: PrismaService) {}

  async createRubric(newRubric: Rubric){
    if (newRubric.slug) {
      newRubric.slug = newRubric.slug.toLowerCase()
    } else {
      newRubric.slug = slugify(newRubric.title, {
        replacement: '-',
        remove: undefined,
        lower: true,
        strict: false,
        locale: 'ru',
        trim: true,
      })
    }

    return this.prismaService.rubric.create({
      data: {
        id:v4(),
        ...newRubric
      }
    })
      .then((rubric) => rubric)
      .catch((err) => {
        throw new HttpException(err.meta, HttpStatus.INTERNAL_SERVER_ERROR);
      })
  }
}