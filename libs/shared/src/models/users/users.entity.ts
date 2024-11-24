import { Entity, Property, OneToMany, Collection } from '@mikro-orm/core';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../base.entity';
import { Todo } from '../todo/todo.entity';

@InputType('UserInput')
@ObjectType('User')
@Entity({
  tableName: 'users',
})
export class User extends BaseEntity {
  @Property({
    nullable: false,
    columnType: 'character varying',
  })
  @Field()
  firstName: string;

  @Property({
    nullable: false,
    columnType: 'character varying',
  })
  @Field()
  lastName: string;

  @Property({
    nullable: false,
    columnType: 'character varying',
  })
  @Field()
  email: string;

  @OneToMany(() => Todo, (todo) => todo.assignee)
  @Field(() => [Todo], {
    nullable: true,
  })
  todos = new Collection<Todo>(this);
}
