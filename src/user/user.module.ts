import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './users.repository';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [UserController],
  exports: [UserService, UserRepository],
  providers: [UserRepository, UserService],
})
export class UserModule {}
