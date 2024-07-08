import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { PrismaService } from '../prisma.service';
import { v4 } from 'uuid';

@Injectable()
export class VideoService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createVideoDto: CreateVideoDto) {
    return this.prismaService.video.create({
      data: {
        id: v4(),
        ...createVideoDto,
      },
    });
  }

  findAll() {
    return this.prismaService.video.findMany({
      take: 10,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  update(id: number, updateVideoDto: UpdateVideoDto) {
    return `This action updates a #${id} video`;
  }
}
