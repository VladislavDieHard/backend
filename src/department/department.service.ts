import { Injectable } from '@nestjs/common';
import { DepartmentGetService } from './services/department.get';
import { DepartmentCreateService } from './services/department.create';
import { DepartmentUpdateService } from './services/department.update';
import { DepartmentDeleteService } from './services/department.delete';

@Injectable()
export class DepartmentService {
  constructor(
    protected departmentGetService: DepartmentGetService,
    protected departmentCreateService: DepartmentCreateService,
    protected departmentUpdateService: DepartmentUpdateService,
    protected departmentDeleteService: DepartmentDeleteService,
  ) {}
}
