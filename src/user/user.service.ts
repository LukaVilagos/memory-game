import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUser(user: UserEntity): Promise<UserEntity> {
    const found = await this.userRepository.getUser(user);

    if (!found) {
      throw new NotFoundException(`User with ID "${user.id}" not found`);
    }

    return found;
  }

  async getUsersByUsername(username: string): Promise<UserEntity> {
    const found = await this.userRepository.getUserByUsername(username);

    if (!found) {
      throw new NotFoundException(`User with username "${username}" not found`);
    }

    return found;
  }
}
