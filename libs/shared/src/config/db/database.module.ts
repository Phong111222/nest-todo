import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import DatabaseService from './database.service';
import { EnvConfig } from '@app/shared/common/env';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Todo } from '@app/shared/models/todo/todo.entity';
import { User } from '@app/shared/models/users/users.entity';
import { Status } from '@app/shared/models/status/status.entity';

const entities = [User, Todo, Status];

@Module({
  exports: [DatabaseService],
  providers: [DatabaseService],
  imports: [
    MikroOrmModule.forRootAsync({
      useFactory: (configService: ConfigService<EnvConfig>) => {
        return {
          debug: true,
          dbName: configService.get('DB_NAME'),
          password: configService.get('DB_PASSWORD'),
          user: configService.get('DB_USER_NAME'),
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          driver: PostgreSqlDriver,
          entities,
          entitiesTs: entities,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
