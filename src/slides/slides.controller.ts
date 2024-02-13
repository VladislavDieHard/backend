import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { QuerySlideDto, QuerySlideOneDto } from './dto/query-slides.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SlidesService } from './slides.service';
import { CreateSlideDto } from './dto/create-slide.dto';
import { UpdateSlideDto } from './dto/update-slide.dto';

@ApiTags('Slides')
@Controller('slides')
export class SlidesController {
  constructor(private readonly slidesService: SlidesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createSlideDto: CreateSlideDto) {
    return this.slidesService.create(createSlideDto);
  }

  @Get()
  findAll(@Query() query: QuerySlideDto) {
    return this.slidesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query() query: QuerySlideOneDto) {
    return this.slidesService.findOne(id, query);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSlideDto: UpdateSlideDto) {
    return this.slidesService.update(id, updateSlideDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.slidesService.remove(+id);
  }
}
