import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from '../user/users.repository';
import { JwtPayload } from './jwt-payload.interface';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userReporsitory: UserRepository) {
    super({
      secretOrKey: 'topSecret51',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<UserEntity> {
    const { username } = payload;
    const user: UserEntity = await this.userReporsitory.findOne({
      where: { username },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
