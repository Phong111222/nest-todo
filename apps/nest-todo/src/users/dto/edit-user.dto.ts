import { BaseEditDto } from '@app/shared/models/base.dto';
import { User } from '@app/shared/models/users/users.entity';
import { InputType } from '@nestjs/graphql';

@InputType({ description: 'Edit user payload' })
export class EditUserDto extends BaseEditDto(User) {}
