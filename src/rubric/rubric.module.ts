import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { RubricService } from './rubric.service';
import { RubricGetService } from './services/rubric.get';
import { RubricController } from './rubric.controller';
import { RubricCreateService } from './services/rubric.create';
import { RubricUpdateService } from './services/rubric.update';
import { RubricDeleteService } from './services/rubric.delete';

@Module({
  providers: [
    RubricService,
    PrismaService,
    RubricGetService,
    RubricCreateService,
    RubricUpdateService,
    RubricDeleteService,
  ],
  controllers: [RubricController],
  exports: [
    RubricService,
    RubricGetService,
    RubricCreateService,
    RubricUpdateService,
    RubricDeleteService,
  ],
})
export class RubricModule {}
