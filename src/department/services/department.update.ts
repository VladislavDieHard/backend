import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Department } from '@prisma/client';
import { parseIdOrSlug } from '../../utils';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class DepartmentUpdateService {
  constructor(private prismaService: PrismaService) {}

  async updateDepartment(
    idOrSlug,
    newDepartment: Department,
  ): Promise<Department> {
    const parsedIdOrSlug = parseIdOrSlug(idOrSlug);
    return this.prismaService.department
      .update({
        where: {
          ...parsedIdOrSlug,
        },
        data: newDepartment,
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw new HttpException(
          err.meta.cause,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }
}
