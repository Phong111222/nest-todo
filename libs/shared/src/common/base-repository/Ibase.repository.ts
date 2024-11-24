import {
  EntityData,
  EntityRepository,
  FilterQuery,
  Loaded,
  RequiredEntityData,
} from '@mikro-orm/core';

export interface IBaseRepository<E extends object> {
  create(entity: RequiredEntityData<E>): Promise<E>;
  update(entity: E | EntityData<E>): Promise<E>;
  findMany(filter?: FilterQuery<E>): Promise<Loaded<E>[]>;
  findOne(
    ...args: Parameters<EntityRepository<E>['findOne']>
  ): ReturnType<EntityRepository<E>['findOne']>;
  //   deleteById(id: string): E;
}
