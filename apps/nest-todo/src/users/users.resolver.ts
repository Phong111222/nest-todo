import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { User } from '@app/shared/models/users/users.entity';
import { PaginationArgument } from '@app/shared/models/pagination';
import { UserConnection } from './dto/users.connection';
import { UserEdge } from './dto/users.edge';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User)
  async user(@Args('id') id: string) {
    const user = await this.usersService.findUser(id);
    return user;
  }

  @Query(() => UserConnection)
  async users(@Args() userArgs: PaginationArgument): Promise<UserConnection> {
    const users = await this.usersService.getUsers();
    return new UserConnection({
      edges: users.map((ele) => {
        return new UserEdge({
          cursor: ele.id,
          node: new User(ele),
        });
      }),
      pageInfo: {
        endCursor: users[users.length - 1].id,
        startCursor: users[0].id,
        hasNextPage: true,
        hasPreviousPage: true,
      },
    });
  }

  @Mutation(() => User)
  async createUser(@Args(CreateUserDto.name) createUserDto: CreateUserDto) {
    const response = await this.usersService.create(createUserDto);
    return response;
  }

  @Mutation(() => User)
  editUser(@Args(EditUserDto.name) editUserDto: EditUserDto) {
    return this.usersService.editUser(editUserDto);
  }
}
