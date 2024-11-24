import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async create(createUserDto: CreateUserDto) {
    const response = await this.usersRepository.create({
      ...createUserDto,
    });
    return response;
  }

  editUser(editUserDto: EditUserDto) {
    return this.usersRepository.update({
      ...editUserDto,
    });
  }

  findUser(id: string) {
    return this.usersRepository.findOne(
      {
        id,
      },
      //{ populate: ['todos'] },
    );
  }

  getUsers() {
    return this.usersRepository.findMany();
  }
}
