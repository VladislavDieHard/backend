import { Injectable } from "@nestjs/common";
import { RubricGetService } from "./services/rubric.get";
import { RubricCreateService } from "./services/rubric.create";
import { RubricUpdateService } from "./services/rubric.update";
import { RubricDeleteService } from "./services/rubric.delete";

@Injectable()
export class RubricService{
  constructor(
    protected rubricGetService:RubricGetService,
    protected rubricCreateService:RubricCreateService,
    protected rubricUpdateService:RubricUpdateService,
    protected rubricDeleteService:RubricDeleteService,
  ){}
}