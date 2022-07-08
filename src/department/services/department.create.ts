import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Department } from '@prisma/client';
import { v4 } from 'uuid';
import { createSlug } from '../../utils';

@Injectable()
export class DepartmentCreateService {
  constructor(private prismaService: PrismaService) {}

  async createDepartment(
    newDepartment: Department,
  ): Promise<Department | Error> {
    newDepartment.slug = createSlug(
      newDepartment.title,
      newDepartment.slug,
      false,
    );

    return this.prismaService.department
      .create({
        data: {
          id: v4(),
          ...newDepartment,
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
