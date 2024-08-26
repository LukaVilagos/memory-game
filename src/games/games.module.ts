import { Module } from '@nestjs/common';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameEntity } from './game.entity';
import { GameRepository } from './games.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([GameEntity]), AuthModule],
  controllers: [GamesController],
  exports: [GamesService],
  providers: [GamesService, GameRepository],
})
export class GamesModule {}
