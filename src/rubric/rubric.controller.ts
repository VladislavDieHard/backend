import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RubricService } from './rubric.service';
import { ApiTags } from '@nestjs/swagger';
import { Rubric } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
@Controller('rubric')
@ApiTags('Rubric')
export class RubricController extends RubricService {
  @Get()
  getRubrics(
    @Query('pageSize') pageSize?: number,
    @Query('orderBy') orderBy?: string,
    @Query('search') search?: string,
    @Query('page') page?: number,
    @Query('isDeleted') isDeleted?: string,
  ) {
    return this.rubricGetService.getRubrics({
      pageSize,
      orderBy,
      search,
      page,
      isDeleted,
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
    @Query('isDeleted') isDeleted: string,
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
      fromDate,
      toDate,
      pageSize,
      orderBy,
      search,
      page,
      include,
      searchByField,
      isDeleted,
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
