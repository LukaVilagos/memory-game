import { IsEnum, IsNotEmpty } from 'class-validator';
import { GameStatus } from '../game-status.enum';

export class UpdateGameStatusDto {
  @IsNotEmpty()
  @IsEnum(GameStatus)
  status: GameStatus;
}
