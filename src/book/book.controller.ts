import { Book } from '@prisma/client';
import { BookService } from './book.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getBooks() {
    return this.bookService.getGenres();
  }

  @Post()
  createBook(@Body() newBook: Book) {
    return this.bookService.createBook(newBook);
  }
}
