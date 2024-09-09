import { Injectable, NotFoundException } from '@nestjs/common';
import { GameStatus } from './game-status.enum';
import { CreateGameDto } from './dto/create-game.dto';
import { GetGamesFilterDto } from './dto/get-games-filter.dto';
import { GameRepository } from './games.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { GameEntity } from './game.entity';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class GamesService {
  constructor(private gameRepository: GameRepository) {}

  async getGames(
    filterDto: GetGamesFilterDto,
    user: UserEntity,
  ): Promise<GameEntity[]> {
    return this.gameRepository.getGames(filterDto, user);
  }

  async getGameById(id: string, user: UserEntity): Promise<GameEntity> {
    const found = await this.gameRepository.getGameById(id, user);

    if (!found) {
      throw new NotFoundException(`Game with ID "${id}" not found`);
    }

    return found;
  }

  async getAllGames(): Promise<GameEntity[]> {
    return this.gameRepository.getAllGames();
  }

  async createGame(
    createGameDto: CreateGameDto,
    user: UserEntity,
  ): Promise<GameEntity> {
    return await this.gameRepository.createGame(createGameDto, user);
  }

  async deleteGame(id: string, user: UserEntity): Promise<void> {
    const result = await this.gameRepository.deleteGame(id, user);
    if (result.affected === 0) {
      throw new NotFoundException(`Game with ID "${id}" not found`);
    }
  }

  async updateGameStatus(
    id: string,
    status: GameStatus,
    user: UserEntity,
  ): Promise<GameEntity> {
    const game = await this.getGameById(id, user);

    game.status = status;
    await this.gameRepository.save(game);

    return game;
  }
}
