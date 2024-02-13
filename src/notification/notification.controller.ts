import { ApiTags } from '@nestjs/swagger';
import { Notification } from '@prisma/client';
import { NotificationService } from './notification.service';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Param,
  Put,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Notification')
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  getNotification() {
    return this.notificationService.getNotification();
  }

  @Get('/all')
  getNotifications() {
    return this.notificationService.getNotifications();
  }

  @Get('/:id')
  getNotificationById(@Param('id') id: string) {
    return this.notificationService.getNotificationById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createNotification(@Body() newNotification: Notification) {
    return this.notificationService.createNotification(newNotification);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  updateNotification(
    @Param('id') id: string,
    @Body() newNotification: Notification,
  ) {
    return this.notificationService.updateNotification(id, newNotification);
  }
}
