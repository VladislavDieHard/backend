import { Injectable } from '@nestjs/common';
import { GetService } from '../commonServices/getService';

@Injectable()
export class MainSliderService extends GetService {
  getSlides({ path, pageSize, page }) {
    return this.includeFields('image,entry')
      .addPagination(pageSize, page)
      .executeFindMany('MainSlider');
  }
}
