import { createGplConnection } from '@app/shared/models/pagination';
import { User } from '@app/shared/models/users/users.entity';
import { ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'User connection' })
export class UserConnection extends createGplConnection(User) {
  constructor(params: UserConnection) {
    super();
    Object.assign(this, params);
  }
}
