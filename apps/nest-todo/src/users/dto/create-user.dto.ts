import { BaseCreateDto } from '@app/shared/models/base.dto';
import { User } from '@app/shared/models/users/users.entity';
import { InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType({ description: 'CreateUserDto payload' })
export class CreateUserDto extends BaseCreateDto(User) {
  @IsNotEmpty()
  lastName: string;
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
