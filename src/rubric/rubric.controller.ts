import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { RubricService } from './rubric.service';
import { ApiTags } from '@nestjs/swagger';
import { Rubric } from '@prisma/client';
@Controller('rubric')
@ApiTags('Rubric')
export class RubricController extends RubricService {
  @Get()
  getRubrics(
    @Query('pageSize') pageSize?: number,
    @Query('orderBy') orderBy?: string,
    @Query('search') search?: string,
    @Query('page') page?: number,
  ) {
    return this.rubricGetService.getRubrics({
      pageSize: pageSize,
      orderBy: orderBy,
      search: search,
      page: page,
    });
  }

  @Get(':idOrSlug')
  getRubric(@Param('idOrSlug') idOrSlug: string, includesString: string) {
    return this.rubricGetService.getRubric(idOrSlug, includesString);
  }

  @Post()
  createRubric(@Body() newRubric: Rubric) {
    return this.rubricCreateService.createRubric(newRubric);
  }

  @Put(':idOrSlug')
  updateRubric(@Param('idOrSlug') idOrSlug: string, @Body() newRubric: Rubric) {
    return this.rubricUpdateService.updateRubric(newRubric, idOrSlug);
  }

  @Delete(':idOrSlug')
  deleteRubric(@Param('idOrSlug') idOrSlug: string) {
    return this.rubricDeleteService.deleteRubric(idOrSlug);
  }
}
