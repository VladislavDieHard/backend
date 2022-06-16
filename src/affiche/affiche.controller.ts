import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { AfficheService } from './affiche.service';
import { Affiche } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Affiche')
@Controller('affiche')
export class AfficheController extends AfficheService {
  @Get()
  getAffiches(@Req() request: any) {
    return this.afficheGetService.getAffiches({
      path: request.path,
    });
  }

  @Get(':idOrSlug')
  getAffiche(@Param('idOrSlug') idOrSlug: string) {
    return this.afficheGetService.getAffiche(idOrSlug);
  }

  @Post()
  createAffiche(@Body() newAffiche: Affiche) {
    return this.afficheCreateService.createAffiche(newAffiche);
  }

  @Put(':idOrSlug')
  updateAffiche(
    @Param('idOrSlug') idOrSlug: string,
    @Body() newAffiche: Affiche,
  ) {
    return this.afficheUpdateService.updateAffiche(idOrSlug, newAffiche);
  }

  @Delete(':idOrSlug')
  deleteAffiche(@Param('idOrSlug') idOrSlug: string) {
    return this.afficheDeleteService.deleteAffiche(idOrSlug);
  }
}
