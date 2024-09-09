import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GameStatus } from './game-status.enum';
import { UserEntity } from 'src/user/user.entity';
import { Exclude } from 'class-transformer';

@Entity('game')
export class GameEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: GameStatus.ACTIVE })
  status: GameStatus;

  @Column({ nullable: true })
  password: string;

  @Column({ default: 0 })
  round: number;

  @ManyToOne(() => UserEntity, (user) => user.game, { eager: false })
  @Exclude({ toPlainOnly: true })
  owner: UserEntity;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  player: UserEntity;
}
