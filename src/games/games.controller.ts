import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { GetGamesFilterDto } from './dto/get-games-filter.dto';
import { UpdateGameStatusDto } from './dto/update-game-status.dto';
import { GameEntity } from './game.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/get-user.decorator';
import { UserEntity } from 'src/user/user.entity';

@Controller('games')
@UseGuards(AuthGuard())
export class GamesController {
  private logger = new Logger('GamesController');

  constructor(private gamesService: GamesService) {}

  @Get()
  getGames(
    @Query() filterDto: GetGamesFilterDto,
    @GetUser() user: UserEntity,
  ): Promise<GameEntity[]> {
    this.logger.verbose(
      `User "${user.username}" retrieving all games. Filters: ${JSON.stringify(filterDto)}`,
    );
    return this.gamesService.getGames(filterDto, user);
  }

  @Get('/all')
  getAllGames(): Promise<GameEntity[]> {
    return this.gamesService.getAllGames();
  }

  @Get('/id/:id')
  async getGameById(
    @Param('id') id: string,
    @GetUser() user: UserEntity,
  ): Promise<GameEntity> {
    this.logger.verbose(
      `User "${user.username}" retrieving game with ID: ${id}`,
    );
    return await this.gamesService.getGameById(id, user);
  }

  @Post()
  async createGame(
    @Body() createGameDto: CreateGameDto,
    @GetUser() user: UserEntity,
  ): Promise<GameEntity> {
    this.logger.verbose(
      `User "${user.username}" creating a new game. Data: ${JSON.stringify(createGameDto)}`,
    );
    return await this.gamesService.createGame(createGameDto, user);
  }

  @Delete('/:id')
  deleteGame(
    @Param('id') id: string,
    @GetUser() user: UserEntity,
  ): Promise<void> {
    this.logger.verbose(
      `User "${user.username}" deleting a game with ID: ${id}`,
    );
    return this.gamesService.deleteGame(id, user);
  }

  @Patch('/:id/status')
  updateGameStatus(
    @Param('id') id: string,
    @Body() updateGameStatusDto: UpdateGameStatusDto,
    @GetUser() user: UserEntity,
  ): Promise<GameEntity> {
    const { status } = updateGameStatusDto;

    this.logger.verbose(
      `User "${user.username}" updating game with ID: ${id}. Status: ${status}`,
    );
    return this.gamesService.updateGameStatus(id, status, user);
  }
}
