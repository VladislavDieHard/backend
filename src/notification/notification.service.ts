import { Notification } from '@prisma/client';
import { PrismaService } from './../prisma.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { v4 } from 'uuid';

@Injectable()
export class NotificationService {
  constructor(private readonly prismaService: PrismaService) {}

  async getNotification() {
    const data = await this.prismaService.notification.findFirst({
      orderBy: { startTime: 'desc' },
      where: {
        endTime: {
          gte: new Date(),
        },
      },
    });
    return data;
  }

  async getNotificationById(id: string) {
    const data = await this.prismaService.notification.findFirst({
      where: {
        id: id, 
      },
    });
    return data;
  }

  async getNotifications() {
    const data = await this.prismaService.notification.findMany();
    return data;
  }

  async updateNotification(id: string, updateNotification: Notification) {
    const notification = await this.prismaService.notification.update({
      where: {
        id: id,
      },
      data: updateNotification,
    });

    return this.prismaService.notification
      .findUnique({
        where: {
          id: notification.id,
        },
      })
      .then((notification) => notification)
      .catch((err) => {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  async createNotification(newNotification: Notification) {
    if (!newNotification.startTime) {
      newNotification.startTime = new Date();
    }

    if (!newNotification.endTime) {
      newNotification.endTime = new Date(+new Date() + 86400000);
    }

    const notification = await this.prismaService.notification.create({
      data: {
        id: v4(),
        ...newNotification,
      },
    });

    return this.prismaService.notification
      .findUnique({
        where: {
          id: notification.id,
        },
      })
      .then((notification) => notification)
      .catch((err) => {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }
}
