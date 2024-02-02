import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GetService } from '../commonServices/getService';
import { ServiceArgs } from '../menu-item/menu-item.types';
import { MultiResponse } from '../commonServices/types';
import { Document } from '@prisma/client';
import { parseIdOrSlug } from '../utils';
import { v4 } from 'uuid';

@Injectable()
export class DocumentService extends GetService {
  async getDocuments({
    include,
    pageSize,
    page,
    searchByField,
    isDeleted,
  }: ServiceArgs): Promise<MultiResponse<Document[]>> {
    try {
      return this.includeFields(include)
        .addPagination(pageSize, page)
        .addSearchByFieldValue(searchByField)
        .addIsDeleted(isDeleted)
        .executeFindMany('Document');
    } catch (e) {
      throw new HttpException('Error with query', HttpStatus.BAD_REQUEST);
    }
  }

  async getDocument(idOrSlug): Promise<Document> {
    try {
      return this.executeFindUnique('Document', idOrSlug);
    } catch (e) {
      throw new HttpException('Error with query', HttpStatus.BAD_REQUEST);
    }
  }

  async createDocument(newDocument: Document & any): Promise<Document> {
    const documentToSave = {
      id: v4(),
      title: newDocument.title,
      content: newDocument.content,
      menuItemId: newDocument?.menuItemId || newDocument?.menuItem,
      fileId: newDocument?.fileId || newDocument?.file,
    };

    try {
      return await this.prismaService.document.create({
        data: documentToSave,
      });
    } catch (e) {
      throw new HttpException('Error with data', HttpStatus.BAD_REQUEST);
    }
  }

  async updateDocument(
    idOrSlug: string,
    newDocument: Document,
  ): Promise<Document> {
    const parsedIdOrSlug = parseIdOrSlug(idOrSlug);
    try {
      return await this.prismaService.document.update({
        where: parsedIdOrSlug as undefined as any,
        data: newDocument,
      });
    } catch {
      throw new HttpException('Error with data', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteDocument(idOrSlug: string): Promise<Document> {
    const parsedIdOrSlug = parseIdOrSlug(idOrSlug);
    try {
      return await this.prismaService.document.delete({
        where: parsedIdOrSlug as undefined as any,
      });
    } catch {
      throw new HttpException('Error with data', HttpStatus.BAD_REQUEST);
    }
  }
}
