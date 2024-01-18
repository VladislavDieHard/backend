import { v4 } from 'uuid';
import { BookCreateDto } from './dto/book-create.dto';
import { PrismaService } from 'src/prisma.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Book } from '@prisma/client';

@Injectable()
export class BookService {
  constructor(private readonly prismaService: PrismaService) {}

  async getGenres() {
    return await this.prismaService.book.findMany();
  }

  async createBook(bookCreateDto: Book) {
    try {
      return await this.prismaService.book.create({
        data: {
          id: v4(),
          ...bookCreateDto,
        },
      });
    } catch {
      throw new HttpException('Error with data', HttpStatus.BAD_REQUEST);
    }
  }
}
