import { Book } from '@prisma/client';
import { BookService } from './book.service';
import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getBooks(
    @Query('pageSize') pageSize?: number,
    @Query('orderBy') orderBy?: string,
    @Query('page') page?: number,
    @Query('include') include?: string,
  ) {
    return this.bookService.getBooks({
      pageSize,
      orderBy,
      page,
      include,
    });
  }
  @Get(':id')
  getBookById(@Param('id') id: string) {
    return this.bookService.getOneBook(id);
  }

  @Post()
  createBook(@Body() newBook: Book) {
    return this.bookService.createBook(newBook);
  }

  @Put(':id')
  updateBook(@Param('id') id: string, @Body() newBook: Book) {
    return this.bookService.updateBook(newBook, id);
  }
}
