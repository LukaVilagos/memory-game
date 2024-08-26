import { EntitySubscriberInterface, EventSubscriber } from 'typeorm';
import { GameEntity } from './game.entity';

EventSubscriber();
export class GameSubscriber implements EntitySubscriberInterface<GameEntity> {
  listenTo() {
    return GameEntity;
  }
}
