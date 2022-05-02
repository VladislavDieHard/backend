import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Department } from '@prisma/client';
import { parseIdOrSlug } from '../../utils';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class DepartmentDeleteService {
  constructor(private prismaService: PrismaService) {}

  async deleteDepartment(idOrSlug): Promise<Department> {
    const parsedIdOrSlug = parseIdOrSlug(idOrSlug);
    return this.prismaService.department
      .delete({
        where: {
          ...parsedIdOrSlug,
        },
      })
      .then((department) => {
        return department;
      })
      .catch((err) => {
        throw new HttpException(
          err.meta.cause,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }
}
