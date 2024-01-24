import { GetBookOptions } from './book.type';
import { GetService } from './../commonServices/getService';
import { v4 } from 'uuid';
import { BookCreateDto } from './dto/book-create.dto';
import { PrismaService } from 'src/prisma.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Book } from '@prisma/client';

@Injectable()
export class BookService extends GetService {
  async getBooks(options: GetBookOptions): Promise<Book[]> {
    return this.addPagination(options.pageSize, options.page)
      .includeFields(options.include)
      .addOrderBy(options.orderBy)
      .executeFindMany('Book');
  }

  async getOneBook(id: string): Promise<Book> {
    return this.executeFindUnique('Book', id);
  }

  async createBook(newBook: any) {
    try {
      return this.prismaService.book.create({
        data: {
          ...newBook,
          id: v4(),
        },
      });
    } catch {
      throw new HttpException('Error with data', HttpStatus.BAD_REQUEST);
    }
  }

  async updateBook(book: Book, id: string) {
    return this.prismaService.book.update({
      where: {
        id: id,
      },
      data: {
        ...book,
      },
    });
  }
}
