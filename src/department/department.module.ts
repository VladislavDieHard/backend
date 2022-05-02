import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { PrismaService } from 'src/prisma.service';
import { DepartmentUpdateService } from './services/department.update';
import { DepartmentGetService } from './services/department.get';
import { DepartmentCreateService } from './services/department.create';
import { DepartmentDeleteService } from './services/department.delete';

@Module({
  providers: [
    PrismaService,
    DepartmentService,
    DepartmentGetService,
    DepartmentUpdateService,
    DepartmentCreateService,
    DepartmentDeleteService,
  ],
  controllers: [DepartmentController],
})
export class DepartmentModule {}
