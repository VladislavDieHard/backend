import { Controller, Get } from '@nestjs/common';
import { GenreService } from './genre.service';

@Controller('genre')
export class GenreController {
  constructor(private genreService: GenreService) {}

  @Get()
  getGames() {
    return this.genreService.getGenres();
  }
}
