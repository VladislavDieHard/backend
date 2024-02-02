import { CommonHelpers } from './../common/helpers/common-helpers.service';
import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PrismaService, DepartmentService, CommonHelpers],
  controllers: [DepartmentController],
})
export class DepartmentModule {}
