import { Module } from '@nestjs/common';
import { AfficheService } from './affiche.service';
import { AfficheController } from './affiche.controller';
import { AfficheGetService } from './services/affiche.get';
import { AfficheCreateService } from './services/affiche.create';
import { AfficheUpdateService } from './services/affiche.update';
import { AfficheDeleteService } from './services/affiche.delete';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [
    PrismaService,
    AfficheService,
    AfficheGetService,
    AfficheCreateService,
    AfficheUpdateService,
    AfficheDeleteService,
  ],
  controllers: [AfficheController],
})
export class AfficheModule {}
