import { AfficheCreateService } from './services/affiche.create';
import { AfficheUpdateService } from './services/affiche.update';
import { AfficheDeleteService } from './services/affiche.delete';
import { AfficheGetService } from './services/affiche.get';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AfficheService {
  constructor(
    protected afficheGetService: AfficheGetService,
    protected afficheCreateService: AfficheCreateService,
    protected afficheUpdateService: AfficheUpdateService,
    protected afficheDeleteService: AfficheDeleteService,
  ) {}
}
