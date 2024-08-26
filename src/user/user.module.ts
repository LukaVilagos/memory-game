import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './users.repository';
import { UserService } from './user.service';

@Module({
  imports: [],
  exports: [UserService, UserRepository],
  controllers: [UserController],
  providers: [UserRepository, UserService],
})
export class UserModule {}
