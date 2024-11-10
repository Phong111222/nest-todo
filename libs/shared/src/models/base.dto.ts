import { InputType, OmitType } from '@nestjs/graphql';
import { BaseEntity } from './base.entity';
import { Type } from '@nestjs/common';

const excludedCreateKeys = [
  'id',
  'deletedAt',
  'createdAt',
  'createdBy',
  'isDeleted',
  'updatedAt',
] as const;
const excludedEditKeys = ['id', 'isDeleted', 'updatedAt'] as const;

export function BaseCreateDto<E extends BaseEntity>(entity: Type<E>) {
  const concatOmitKeys = [...excludedCreateKeys];

  @InputType()
  class Dto extends OmitType(entity as Type, concatOmitKeys) {}

  return Dto as Type<Omit<E, (typeof concatOmitKeys)[number]>>;
}

export function BaseEditDto<E extends BaseEntity>(entity: Type<E>) {
  const concatOmitKeys = [...excludedEditKeys];
  @InputType()
  class Dto extends OmitType(entity as Type, concatOmitKeys) {}

  return Dto as Type<Omit<E, (typeof concatOmitKeys)[number]>>;
}
