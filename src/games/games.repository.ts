import { DataSource, DeleteResult, Repository } from 'typeorm';
import { GameEntity } from './game.entity';
import { CreateGameDto } from './dto/create-game.dto';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { GetGamesFilterDto } from './dto/get-games-filter.dto';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class GameRepository extends Repository<GameEntity> {
  private logger = new Logger('GameRepository', { timestamp: true });
  constructor(private dataSource: DataSource) {
    super(GameEntity, dataSource.createEntityManager());
  }

  public async getGames(
    filterDto: GetGamesFilterDto,
    user: UserEntity,
  ): Promise<GameEntity[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('game')
      .leftJoinAndSelect('game.owner', 'owner')
      .leftJoinAndSelect('game.player', 'player');

    query.where('(game.ownerId = :userId)', {
      userId: user.id,
    });

    if (status) {
      query.andWhere('(game.status = :status)', { status });
    }

    if (search) {
      query.andWhere(
        '(owner.username LIKE :search OR player.username LIKE :search)',
        {
          search: `%${search}%`,
        },
      );
    }

    try {
      const games = await query.getMany();
      return games;
    } catch (error) {
      this.logger.error(
        `Error retrieving games for user "${user.username}". Filters: ${JSON.stringify(search)}. Error: ${error.message}`,
      );
      throw new InternalServerErrorException();
    }
  }

  public async getAllGames(): Promise<GameEntity[]> {
    return this.find();
  }

  public async getGameById(id: string, user: UserEntity): Promise<GameEntity> {
    return this.findOne({ where: { id, owner: user } });
  }

  public async createGame(
    createGameDto: CreateGameDto,
    user: UserEntity,
  ): Promise<GameEntity> {
    const { password } = createGameDto;

    const game = this.create({
      password,
      owner: user,
    });

    await this.save(game);
    return game;
  }

  public async deleteGame(id: string, user: UserEntity): Promise<DeleteResult> {
    const result = this.delete({ id, owner: user });
    return result;
  }
}
