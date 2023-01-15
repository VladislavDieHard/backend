import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MetadataDto } from './common.dto';
import { ModelService } from './commonServices/modelService';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ModelData, ModelKey } from './commonServices/types';
import { CreateService } from './commonServices/createService';

type CookieResponse = Response & { cookie(key, value, options): void };

type CookieRequest = Request & { cookies: { [key: string]: string } };

@ApiTags('Common')
@Controller()
export class AppController extends ModelService {
  constructor(
    private authService: AuthService,
    private createService: CreateService,
  ) {
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
  @Get('/meta')
  getMetadata() {
    return this.getModels();
  }

  @Get('/meta/model')
  getModelMetadata(@Query('model') model: string) {
    return this.getModelMeta(model);
  }

  @Get('/whoami')
  whoAmI(@Req() req: CookieRequest) {
    return this.authService.whoAmI(req.cookies.token);
  }

  @ApiQuery({
    name: 'username',
    required: false,
    description: 'Поиск по полям title и content',
  })
  @ApiQuery({
    name: 'password',
    required: false,
    description: 'Поиск по полям title и content',
  })
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(
    @Body() user,
    @Res({ passthrough: true }) response: CookieResponse,
  ) {
    const loginObj = await this.authService.login(user);

    response.cookie('token', loginObj.token, {
      maxAge: 1000 * 60 * 60 * 24 * 2,
      httpOnly: true,
    });

    return {
      username: loginObj.username,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('bulk/create/:model')
  async bulkCreate(
    @Body() modelData: ModelData[],
    @Param('model') model: ModelKey,
  ) {
    return this.createService.executeBulkCreate(model, modelData);
  }
}
