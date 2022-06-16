import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MetadataDto } from './common.dto';
import { ModelService } from './commonServices/modelService';

@ApiTags('Common')
@Controller()
export class AppController extends ModelService {
  @ApiOperation({
    summary: 'Возвращает метаданные всех моделей',
  })
  @ApiResponse({
    status: 200,
    description: 'Возвращает метаданные всех моделей',
    type: MetadataDto,
  })
  @Get('/m*a')
  getMetadata() {
    return this.getModels();
  }

  @Get('/m*a/model')
  getModelMetadata(@Query('model') model: string) {
    return this.getModelMeta(model);
  }
}
