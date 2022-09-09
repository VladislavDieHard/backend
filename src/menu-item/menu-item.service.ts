import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createSlug, parseIdOrSlug } from '../utils';
import { ServiceArgs } from './menu-item.types';
import { MenuItem, Document } from '@prisma/client';
import { MultiResponse } from '../commonServices/types';
import { GetService } from '../commonServices/getService';
import { v4 } from 'uuid';

@Injectable()
export class MenuItemService extends GetService {
  async getMenuItems(options: ServiceArgs): Promise<MultiResponse<MenuItem[]>> {
    try {
      return this.includeFields(options.include)
        .addPagination(options.pageSize, options.page)
        .addSearchByFieldValue(options.searchByField)
        .executeFindMany('MenuItem');
    } catch (e) {
      throw new HttpException('Error with query', HttpStatus.BAD_REQUEST);
    }
  }

  async getMenuItem(idOrSlug, includeString): Promise<MenuItem> {
    try {
      return this.includeFields(includeString).executeFindUnique(
        'MenuItem',
        idOrSlug,
      );
    } catch (e) {
      throw new HttpException('Error with query', HttpStatus.BAD_REQUEST);
    }
  }

  async createMenuItem(newMenuItem: MenuItem): Promise<MenuItem> {
    newMenuItem.slug = createSlug(newMenuItem.title, newMenuItem.slug);
    try {
      return await this.prismaService.menuItem.create({
        data: {
          id: v4(),
          ...newMenuItem,
        },
      });
    } catch {
      throw new HttpException('Error with data', HttpStatus.BAD_REQUEST);
    }
  }

  async updateMenuItem(newMenuItem: MenuItem, idOrSlug): Promise<MenuItem> {
    const parsedIdOrSlug = parseIdOrSlug(idOrSlug);
    try {
      return await this.prismaService.menuItem.update({
        where: {
          ...parsedIdOrSlug,
        },
        data: newMenuItem,
      });
    } catch {
      throw new HttpException('Error with data', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteMenuItem(idOrSlug): Promise<MenuItem> {
    const parsedIdOrSlug = parseIdOrSlug(idOrSlug);
    try {
      return await this.prismaService.menuItem.delete({
        where: {
          ...parsedIdOrSlug,
        },
      });
    } catch (e) {
      throw new HttpException(
        e.meta.cause || 'Bad request',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getDocuments(options: ServiceArgs): Promise<MultiResponse<Document[]>> {
    try {
      return this.includeFields(options.include)
        .addPagination(options.pageSize, options.page)
        .addSearchByFieldValue(options.searchByField)
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

  async createDocument(newDocument: Document): Promise<Document> {
    try {
      return await this.prismaService.document.create({
        data: newDocument,
      });
    } catch {
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
        where: parsedIdOrSlug,
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
        where: parsedIdOrSlug,
      });
    } catch {
      throw new HttpException('Error with data', HttpStatus.BAD_REQUEST);
    }
  }
}
