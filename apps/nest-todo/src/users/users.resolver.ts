import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { User } from '@app/shared/models/users/users.entity';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User)
  getUser() {}

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
