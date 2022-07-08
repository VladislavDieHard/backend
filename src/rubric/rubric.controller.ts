import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { RubricService } from './rubric.service';
import { ApiTags } from '@nestjs/swagger';
import { Rubric } from '@prisma/client';
@Controller('rubric')
@ApiTags('Rubric')
export class RubricController extends RubricService {
  @Get()
  getRubrics(
    @Req() request: any,
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
      path: request.originalUrl,
    });
  }

  @Get(':idOrSlug')
  getRubric(@Param('idOrSlug') idOrSlug: string, includesString: string) {
    return this.rubricGetService.getRubric(idOrSlug, includesString);
  }

  @Get(':idOrSlug/:model')
  getRubricEntries(
    @Param('idOrSlug') idOrSlug: string,
    @Param('model') model: string,
    @Req() request: any,
    @Query('fromDate') fromDate?: Date,
    @Query('toDate') toDate?: Date,
    @Query('pageSize') pageSize?: number,
    @Query('orderBy') orderBy?: string,
    @Query('search') search?: string,
    @Query('page') page?: number,
    @Query('include') include?: string,
    @Query('searchByField') searchByField?: string,
  ) {
    return this.rubricGetService.getEntriesByRubric({
      idOrSlug,
      model,
      path: request.originalUrl,
      fromDate,
      toDate,
      pageSize,
      orderBy,
      search,
      page,
      include,
      searchByField,
    });
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
