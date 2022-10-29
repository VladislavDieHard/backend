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
import { AfficheService } from './affiche.service';
import { Affiche } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Affiche')
@Controller('affiche')
export class AfficheController extends AfficheService {
  @Get()
  getAffiches(
    @Query('fromDate') fromDate?: Date,
    @Query('toDate') toDate?: Date,
    @Query('pageSize') pageSize?: number,
    @Query('orderBy') orderBy?: string,
    @Query('search') search?: string,
    @Query('page') page?: number,
    @Query('include') include?: string,
    @Query('searchByField') searchByField?: string,
    @Query('isDeleted') isDeleted?: string,
  ) {
    return this.afficheGetService.getAffiches({
      pageSize,
      fromDate,
      toDate,
      orderBy,
      search,
      page,
      include,
      searchByField,
      isDeleted,
    });
  }

  @Get(':idOrSlug')
  getAffiche(@Param('idOrSlug') idOrSlug: string) {
    return this.afficheGetService.getAffiche(idOrSlug);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createAffiche(@Body() newAffiche: Affiche) {
    return this.afficheCreateService.createAffiche(newAffiche);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':idOrSlug')
  updateAffiche(
    @Param('idOrSlug') idOrSlug: string,
    @Body() newAffiche: Affiche,
  ) {
    return this.afficheUpdateService.updateAffiche(idOrSlug, newAffiche);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':idOrSlug')
  deleteAffiche(@Param('idOrSlug') idOrSlug: string) {
    return this.afficheDeleteService.deleteAffiche(idOrSlug);
  }
}
