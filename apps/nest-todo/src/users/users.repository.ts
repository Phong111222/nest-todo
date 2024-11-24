import { BaseRepository } from '@app/shared/common/base-repository/base.repository';
import { Injectable } from '@nestjs/common';
import { User } from '@app/shared/models/users/users.entity';

@Injectable()
export class UsersRepository extends BaseRepository(User) {}
