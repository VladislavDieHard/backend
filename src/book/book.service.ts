import { BookQuery } from './query.type';
import { v4 } from 'uuid';
import { GetService } from './../commonServices/getService';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService extends GetService {
  create(createBookDto: CreateBookDto) {
    try {
      return this.prismaService.book.create({
        data: {
          id: v4(),
          ...createBookDto,
        },
      });
    } catch {
      throw new HttpException('Error with data', HttpStatus.BAD_REQUEST);
    }
  }

  findAll(options: BookQuery) {
    return this.includeFields(options.include)
      .addPagination(options.pageSize, options.page)
      .addOrderBy(options.orderBy)
      .executeFindMany('Book');
  }

  findOne(id: string) {
    return this.prismaService.book.findUnique({
      where: {
        id: id,
      },
      include: {
        preview: true,
      },
    });
  }

  update(id: string, updateBookDto: UpdateBookDto) {
    return this.prismaService.book.update({
      where: {
        id: id,
      },
      data: {
        ...updateBookDto,
      },
    });
  }
}
