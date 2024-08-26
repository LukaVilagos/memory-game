import { Module } from '@nestjs/common';
import { GamesModule } from './games/games.module';
import { TypeOrmModule } from './typeorm/typeorm.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
    }),
    TypeOrmModule,
    GamesModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
