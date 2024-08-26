import { GameStatus } from '../game-status.enum';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class GetGamesFilterDto {
  @IsOptional()
  @IsEnum(GameStatus)
  status: GameStatus;

  @IsOptional()
  @IsString()
  search: string;
}
