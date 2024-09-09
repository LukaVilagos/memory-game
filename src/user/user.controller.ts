import {
  Controller,
  Get,
  Logger,
  Param,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { GetUser } from './get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
@UseGuards(AuthGuard())
export class UserController {
  private logger = new Logger('UserController');

  constructor(private userService: UserService) {}

  @Get()
  getUser(@GetUser() user: UserEntity): Promise<UserEntity> {
    return this.userService.getUser(user);
  }

  @Get('/get-by-username/:username')
  getUsersByUsername(
    @Param('username') username: string,
    @GetUser() user: UserEntity,
  ): Promise<UserEntity> {
    if (user.username !== username) {
      this.logger.warn(
        `User "${user.username}" tried to access data of user "${username}"`,
      );
      throw new UnauthorizedException(
        "You are not authorized to access this user's data",
      );
    }

    return this.userService.getUsersByUsername(username);
  }
}
