import { Entity, Property } from '@mikro-orm/core';
import { Field, ObjectType, InputType } from '@nestjs/graphql';
import { BaseEntity } from '../base.entity';

@Entity()
@ObjectType({ description: 'Todo Status Entity' })
@InputType('StatusInput')
export class Status extends BaseEntity {
  @Property()
  @Field()
  name: string;

  @Property()
  @Field()
  color: string;
}
