import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GetService } from '../commonServices/getService';
import { MainSlider } from '@prisma/client';
import { v4 } from 'uuid';
import { parseIdOrSlug } from '../utils';

@Injectable()
export class MainSliderService extends GetService {
  getSlides({
    searchByField,
    include,
    pageSize,
    page,
    orderBy,
    isDeleted,
  }): Promise<MainSlider> {
    try {
      return this.includeFields(include)
        .addIsDeleted(isDeleted)
        .addOrderBy(orderBy)
        .addPagination(pageSize, page)
        .addSearchByFieldValue(searchByField)
        .executeFindMany('MainSlider');
    } catch (e) {
      throw new HttpException('Error with query', HttpStatus.BAD_REQUEST);
    }
  }

  getSlide(idOrSlug: string, includeString: string): Promise<MainSlider> {
    try {
      return this.includeFields(includeString).executeFindUnique(
        'MainSlider',
        idOrSlug,
      );
    } catch (e) {
      throw new HttpException('Error with query', HttpStatus.BAD_REQUEST);
    }
  }

  async createSlide(mainSlider: MainSlider): Promise<MainSlider> {
    try {
      return await this.prismaService.mainSlider.create({
        data: {
          id: v4(),
          ...mainSlider,
        },
      });
    } catch {
      throw new HttpException('Error with data', HttpStatus.BAD_REQUEST);
    }
  }

  async updateSlide(
    mainSlider: MainSlider,
    idOrSlug: string,
  ): Promise<MainSlider> {
    const parsedIdOrSlug = parseIdOrSlug(idOrSlug);
    try {
      return await this.prismaService.mainSlider.update({
        where: {
          ...parsedIdOrSlug,
        },
        data: mainSlider,
      });
    } catch {
      throw new HttpException('Error with data', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteSlide(idOrSlug: string): Promise<MainSlider> {
    const parsedIdOrSlug = parseIdOrSlug(idOrSlug);
    try {
      return await this.prismaService.mainSlider.delete({
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
}
