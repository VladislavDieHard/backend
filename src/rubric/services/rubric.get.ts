import { Injectable } from '@nestjs/common';
import { GetService } from '../../commonServices/getService';

@Injectable()
export class RubricGetService extends GetService {
  async getRubrics(options) {
    const count = await this.prismaService.rubric.count();

    return this.addSearch(['title'], options.search)
      .addPagination(count, options.pageSize, options.page)
      .executeFindMany('Rubric');
  }

  async getRubric(idOrSlug: string, includesString: string) {
    return this.includeFields(includesString).executeFindUnique(
      'Rubric',
      idOrSlug,
    );
  }
}
