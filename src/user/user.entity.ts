import { GameEntity } from 'src/games/game.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('user')
@Unique(['username'])
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => GameEntity, (game) => game.owner, { eager: true })
  game: GameEntity[];
}
