import { Args, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { User } from '@app/shared/models/users/users.entity';
import {
  createGplConnection,
  PaginationArgument,
} from '@app/shared/models/pagination';

@ObjectType({ description: 'User connection' })
class UserConnection extends createGplConnection(User) {}

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User)
  async user(@Args('id') id: string) {
    const user = await this.usersService.findUser(id);
    return user;
  }

  @Query(() => UserConnection)
  async users(@Args() userArgs: PaginationArgument) {
    const users = await this.usersService.getUsers();
    return users;
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
