import { DataSource } from 'typeorm';
import { Global, Logger, Module } from '@nestjs/common';

const logger = new Logger('TypeOrmModule');

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: DataSource,
      inject: [],
      useFactory: async () => {
        try {
          const dataSource = new DataSource({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'postgres',
            database: 'memory-game',
            synchronize: true,
            entities: [`${__dirname}/../**/**.entity{.ts,.js}`],
          });
          await dataSource.initialize();
          logger.log('Database connected successfully');
          return dataSource;
        } catch (error) {
          logger.log('Error connecting to database');
          throw error;
        }
      },
    },
  ],
  exports: [DataSource],
})
export class TypeOrmModule {}
