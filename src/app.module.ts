import { Module } from '@nestjs/common';
import { EntryModule } from './entry/entry.module';
import { PrismaService } from './prisma.service';
import { MenuModule } from './menu/menu.module';
import { AppController } from './app.controller';
import { MenuItemModule } from './menu-item/menu-item.module';
import { DepartmentModule } from './department/department.module';
import { RubricModule } from './rubric/rubric.module';
import { AfficheModule } from './affiche/affiche.module';
import { UploadModule } from './upload/upload.module';
import { MainSliderModule } from './main-slider/main-slider.module';
import { FileModule } from './file/file.modules';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConsoleModule } from '@squareboat/nest-console';
import { CommandService } from './commander/commander.service';

@Module({
  imports: [
    EntryModule,
    MenuModule,
    MenuItemModule,
    DepartmentModule,
    RubricModule,
    AfficheModule,
    UploadModule,
    MainSliderModule,
    FileModule,
    AuthModule,
    UsersModule,
    ConsoleModule,
  ],
  providers: [PrismaService, CommandService],
  controllers: [AppController],
})
export class AppModule {}
