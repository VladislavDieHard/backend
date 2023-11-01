import { Controller, Get, Param, Query } from '@nestjs/common';
import { GamesService } from './games.service';

@Controller('games')
export class GamesController {
  constructor(private gameService: GamesService) {}

  @Get()
  getGames(
    @Query('genres') genres?: string[],
    @Query('search') search?: string,
  ) {
    return this.gameService.getGames(genres, search);
  }

  @Get('/:id')
  getGame(@Param('id') id: string) {
    return this.gameService.getGame(id);
  }
}
