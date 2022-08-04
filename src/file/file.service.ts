import { Injectable } from '@nestjs/common';
import { FileGetService } from "./services/file.get";



@Injectable()
export class FileService {
  constructor(
    protected fileGetService: FileGetService
  ) {}
}