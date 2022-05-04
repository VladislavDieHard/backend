import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Department } from '@prisma/client';
import { v4 } from 'uuid';
import slugify from 'slugify';

@Injectable()
export class DepartmentCreateService {
  constructor(private prismaService: PrismaService) {}

  async createDepartment(
    newDepartment: Department,
  ): Promise<Department | Error> {
    if (newDepartment.slug) {
      newDepartment.slug = newDepartment.slug.toLowerCase();
    } else {
      newDepartment.slug = slugify(newDepartment.title, {
        replacement: '-',
        remove: undefined,
        lower: true,
        strict: false,
        locale: 'ru',
        trim: true,
      });
    }

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
