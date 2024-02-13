import { UpdateAfficheDto } from './dto/update-affiche.dto';
import { CreateAfficheDto } from './dto/create-affiche.dto';
import { QueryAfficheDto } from './dto/query-affiche.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AfficheService } from './affiche.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Affiche')
@Controller('affiche')
export class AfficheController {
  constructor(private readonly afficheService: AfficheService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createAfficheDto: CreateAfficheDto) {
    return this.afficheService.create(createAfficheDto);
  }

  @Get()
  findAll(@Query() query: QueryAfficheDto) {
    return this.afficheService.findAll(query);
  }

  @Get(':idOrSlug')
  findOne(@Param('idOrSlug') idOrSlug: string) {
    return this.afficheService.findOne(idOrSlug);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':idOrSlug')
  update(
    @Param('idOrSlug') idOrSlug: string,
    @Body() updateAfficheDto: UpdateAfficheDto,
  ) {
    return this.afficheService.update(idOrSlug, updateAfficheDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':idOrSlug')
  delete(@Param('idOrSlug') idOrSlug: string) {
    return this.afficheService.delete(idOrSlug);
  }
}
