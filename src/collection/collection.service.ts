import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { PrismaService } from '../prisma.service';
import { v4 } from 'uuid';
import { CollectionQueryDto } from './dto/collection-query.dto';
import { CommonHelpers } from '../common/helpers/common-helpers.service';

@Injectable()
export class CollectionService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly commonService: CommonHelpers,
  ) {}

  async create(createCollectionDto: CreateCollectionDto) {
    try {
      const books = createCollectionDto.books;
      delete createCollectionDto.books;
      const newCollection = await this.prismaService.collection.create({
        data: {
          id: v4(),
          ...createCollectionDto,
        },
      });

      if (books.length > 0) {
        for (let book of books) {
          await this.prismaService.booksOnCollections.create({
            data: {
              collectionId: newCollection.id,
              bookId: book,
            },
          });
        }
      }

      return newCollection;
    } catch {
      throw new HttpException('Error with data', HttpStatus.BAD_REQUEST);
    }
  }

  findAll(params?: CollectionQueryDto) {
    return this.prismaService.collection.findMany({
      include: this.commonService.parseInclude(params.include),
      orderBy: this.commonService.parseOrderBy(params.orderBy),
      where: {
        ...(this.commonService.createIsDelete(params.isDeleted) as any),
      },
    });
  }

  findBooksByCollection(collectionId: string) {
    return this.prismaService.book.findMany({
      where: {
        collections: {
          some: {
            collectionId: collectionId,
          },
        },
      },
      include: {
        preview: true,
      },
    });
  }

  findOne(id: string) {
    try {
      return this.prismaService.collection.findUnique({
        where: {
          id: id,
        },
        include: { books: true },
      });
    } catch (e) {
      return e;
    }
  }

  async update(id: string, updateCollectionDto: UpdateCollectionDto) {
    try {
      const collection = await this.findOne(id);

      if (updateCollectionDto.books) {
        for (const { bookId, collectionId } of collection.books) {
          await this.prismaService.booksOnCollections.delete({
            where: {
              bookId_collectionId: {
                collectionId: collectionId,
                bookId: bookId,
              },
            },
          });
        }

        for (const bookId of updateCollectionDto.books) {
          await this.prismaService.booksOnCollections.create({
            data: {
              bookId: bookId,
              collectionId: collection.id,
            },
          });
        }
      }

      delete updateCollectionDto.books;

      return this.prismaService.collection.update({
        where: { id: id },
        data: { ...(updateCollectionDto as any) },
      });
    } catch (e) {
      return e;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} collection`;
  }
}
