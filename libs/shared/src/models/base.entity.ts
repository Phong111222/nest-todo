import { PrimaryKey, Property } from '@mikro-orm/core';
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { v4 } from 'uuid';

@ObjectType()
@InputType()
export class BaseEntity {
  @Field(() => ID)
  @PrimaryKey({
    columnType: 'uuid',
    primary: true,
  })
  id: string = v4();

  @Field()
  @Property({
    columnType: 'timestamp',
    default: new Date().toDateString(),
  })
  createdAt: string;

  @Field()
  @Property({
    columnType: 'timestamp',
    default: new Date().toDateString(),
  })
  updatedAt: string;

  @Field({
    nullable: true,
  })
  @Property({
    columnType: 'timestamp',
    default: null,
    nullable: true,
  })
  deletedAt: string;

  @Field({
    nullable: true,
  })
  @Property({
    nullable: true,
  })
  createdBy: string;

  @Field()
  @Property({ type: 'boolean', default: false, nullable: true })
  isDeleted: boolean;
}
