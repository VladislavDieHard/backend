import { Injectable } from '@nestjs/common';
import { ExhibitionGetService } from "./services/exhibition.get";

@Injectable()
export class ExhibitionService {
  constructor(
    protected exhibitionGetService: ExhibitionGetService,
  ) {}
}
