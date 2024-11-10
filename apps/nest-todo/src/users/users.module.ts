import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { UsersRepository } from './users.repository';
import { User } from '@app/shared/models/users/users.entity';

@Module({
  imports: [MikroOrmModule.forFeature([User])],
  providers: [UsersRepository, UsersResolver, UsersService],
  exports: [UsersService, UsersResolver],
})
export class UsersModule {}
