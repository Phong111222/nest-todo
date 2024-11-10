import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from '../base.entity';
import { Field, ObjectType, InputType } from '@nestjs/graphql';
import { Status } from '../status/status.entity';
import { User } from '../users/users.entity';

@Entity()
@ObjectType('Todo')
@InputType('TodoInput')
export class Todo extends BaseEntity {
  @Field()
  @Property()
  title: string;

  @Field()
  @Property()
  description: string;

  @Field(() => Status)
  @ManyToOne(() => Status)
  currentStatus?: Status;

  @Field(() => User)
  @ManyToOne(() => User)
  assignee: User;
}
