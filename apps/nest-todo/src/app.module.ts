import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@app/shared/config/db/database.module';
import { EnvModule } from '@app/shared/config/env/env.module';
import { UsersModule } from './users/users.module';
import { AppGraphqlModule } from '@app/shared/config/graphql/graphql.module';
import { join } from 'path';

@Module({
  imports: [
    EnvModule.register(join(process.cwd() + `/apps/nest-todo/.env`)),
    AppGraphqlModule.register(
      join(process.cwd(), './apps/nest-todo/schema.gql'),
    ),
    DatabaseModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
