import { PrismaService } from '../prisma.service';
import { ModelData, ModelKey } from './types';
import { createSlug } from '../utils';
import { v4 } from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';

export class CreateService {
  prismaService: PrismaService;

  constructor() {
    this.prismaService = new PrismaService();
  }

  async executeCreate(model: ModelKey, data: ModelData): Promise<ModelData> {
    data.slug = createSlug(data.title, data.slug, false);

    return this.prismaService[model]
      .create({
        data: {
          id: v4(),
          ...data,
        },
      })
      .then((data) => data)
      .catch(() => {
        throw new HttpException('Error with data', HttpStatus.BAD_REQUEST);
      });
  }

  async executeBulkCreate(model: ModelKey, data: ModelData[]) {
    data.forEach((item) => {
      item.id = v4();

      item.slug = createSlug(item.title, item.slug, false);
    });

    return this.prismaService[model]
      .createMany({
        data: data,
        skipDuplicates: true,
      })
      .then((data) => data)
      .catch(() => {
        throw new HttpException('Error with data', HttpStatus.BAD_REQUEST);
      });
  }
}
