import {
  EntityData,
  FilterQuery,
  Loaded,
  Primary,
  RequiredEntityData,
} from '@mikro-orm/core';

export interface IBaseRepository<E> {
  create(entity: RequiredEntityData<E>): Promise<E>;
  update(entity: E | EntityData<E>): Promise<E>;
  findMany(filter: FilterQuery<E>): Promise<Loaded<E>[]>;
  findOne(filter: FilterQuery<E>): Promise<E>;
  //   deleteById(id: string): E;
}
