import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query, UseGuards
} from "@nestjs/common";
import { RubricService } from './rubric.service';
import { ApiTags } from '@nestjs/swagger';
import { Rubric } from '@prisma/client';
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
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
  getRubric(
    @Param('idOrSlug') idOrSlug: string,
    @Query('include') include?: string,
  ) {
    return this.rubricGetService.getRubric(idOrSlug, include);
  }

  @Get(':idOrSlug/entries')
  getRubricEntries(
    @Param('idOrSlug') idOrSlug: string,
    @Param('model') model: string,
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

  @UseGuards(JwtAuthGuard)
  @Post()
  createRubric(@Body() newRubric: Rubric) {
    return this.rubricCreateService.createRubric(newRubric);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':idOrSlug')
  updateRubric(@Param('idOrSlug') idOrSlug: string, @Body() newRubric: Rubric) {
    return this.rubricUpdateService.updateRubric(newRubric, idOrSlug);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':idOrSlug')
  deleteRubric(@Param('idOrSlug') idOrSlug: string) {
    return this.rubricDeleteService.deleteRubric(idOrSlug);
  }
}
