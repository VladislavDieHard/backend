import { Module } from '@nestjs/common';
import { EntryModule } from './entry/entry.module';
import { PrismaService } from './prisma.service';
import { MenuModule } from './menu/menu.module';
import { AppController } from './app.controller';
import { MenuItemModule } from './menu-item/menu-item.module';
import { DepartmentModule } from './department/department.module';
import { RubricModule } from "./rubric/rubric.module";
import { AfficheModule } from './affiche/affiche.module';

@Module({
  imports: [
    EntryModule,
    MenuModule,
    MenuItemModule,
    DepartmentModule,
    RubricModule,
    AfficheModule,
  ],
  providers: [PrismaService],
  controllers: [AppController],
})
export class AppModule {}
