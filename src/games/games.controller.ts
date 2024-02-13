import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { GamesService } from './games.service';

@ApiTags('Game')
@Controller('games')
export class GamesController {
  constructor(private gameService: GamesService) {}

  @Get()
  getGames(
    @Query('genres') genres?: string[],
    @Query('search') search?: string,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ) {
    return this.gameService.getGames(genres, search, { page, pageSize });
  }

  @Get('/random')
  getGamesRandom() {
    return this.gameService.getRandomGames();
  }

  @Get('/:id')
  getGame(@Param('id') id: string) {
    return this.gameService.getGame(id);
  }
}
