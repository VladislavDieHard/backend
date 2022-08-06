import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MetadataDto } from './common.dto';
import { ModelService } from './commonServices/modelService';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';

@ApiTags('Common')
@Controller()
export class AppController extends ModelService {
  constructor(private authService: AuthService) {
    super();
  }

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

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  login(@Body() user) {
    return this.authService.login(user);
  }
}
