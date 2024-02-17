import { CommonHelpers } from './../common/helpers/common-helpers.service';
import { PrismaService } from './../prisma.service';
import { BookQuery } from './query.type';
import { v4 } from 'uuid';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly commonHelpers: CommonHelpers,
  ) {}

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

  async findAll(options: BookQuery) {
    const total = await this.prismaService.book.count();
    const book = await this.prismaService.book.findMany({
      ...this.commonHelpers.createPagination(options.page, options.pageSize),
      orderBy: this.commonHelpers.parseOrderBy(options.orderBy),
      include: this.commonHelpers.parseInclude(options.include),
      ...this.commonHelpers.createPagination(options.page, options.pageSize),
    });
    return {
      data: book,
      meta: this.commonHelpers.createMeta(
        options.page,
        options.pageSize,
        total,
      ),
    };
  }

  findOne(id: string) {
    return this.prismaService.book.findUnique({
      where: { id: id },
    });
  }

  update(id: string, updateBookDto: UpdateBookDto) {
    return this.prismaService.book.update({
      where: { id: id },
      data: updateBookDto,
    });
  }
}
