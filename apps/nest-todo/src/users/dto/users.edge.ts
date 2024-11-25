import { createEdge } from '@app/shared/models/pagination';
import { User } from '@app/shared/models/users/users.entity';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserEdge extends createEdge(User) {
  constructor(params: UserEdge) {
    super();
    Object.assign(this, params);
  }
}
