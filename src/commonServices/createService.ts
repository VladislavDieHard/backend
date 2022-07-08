import { PrismaService } from '../prisma.service';

export class CreateService {
  prismaService: PrismaService;

  constructor() {
    this.prismaService = new PrismaService();
  }

  /* Execute create */

  async executeCreate(model): Promise<any> {
    this.prismaService[model].create({});
  }
}
