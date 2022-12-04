import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Exhibition } from "@prisma/client";
import { ExhibitionService } from "./exhibition.service";

@Controller('exhibition')
export class ExhibitionController extends ExhibitionService {
  @Get()
  getExhibitions(
    @Query('pageSize') pageSize?: number,
    @Query('orderBy') orderBy?: string,
    @Query('search') search?: string,
    @Query('page') page?: number,
    @Query('isDeleted') isDeleted?: string,
    @Query('searchByField') searchByField?: string,
  ) {
    return this.exhibitionGetService.getExhibition({
      searchByField,
      isDeleted,
      pageSize,
      orderBy,
      search,
      page,
    });
  }

  @Get(':id')
  getExhibition(
    @Param('id') id: string,
    @Query('include') include?: string,
  ) {
    return this.rubricGetService.getRubric(id, include);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createExhibition(@Body() newExhibition: Exhibition) {
    return this.rubricCreateService.createRubric(newExhibition);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateExhibition(@Param('id') id: string, @Body() newExhibition: Exhibition) {
    return this.rubricUpdateService.updateRubric(newExhibition, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteExhibition(@Param('id') id: string) {
    return this.rubricDeleteService.deleteRubric(id);
  }
}
