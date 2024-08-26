import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async createUser(auhtCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = auhtCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      username,
      password: hashedPassword,
    });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
