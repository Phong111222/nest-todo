import {
  EntityData,
  EntityName,
  EntityRepository,
  FilterQuery,
} from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Type } from '@nestjs/common';
import { IBaseRepository } from './Ibase.repository';
import { BaseEntity } from '@app/shared/models/base.entity';

export function BaseRepository<E extends BaseEntity>(
  entity: EntityName<E>,
): Type<IBaseRepository<E>> {
  class BaseRepository implements IBaseRepository<E> {
    constructor(
      @InjectRepository(entity) private readonly repo: EntityRepository<E>,
    ) {}
    async create(data: E) {
      const newRecord = this.repo.create(data);
      await this.repo.insert(newRecord);
      return newRecord;
    }

    update(entity: E | EntityData<E>) {
      return this.repo.upsert(entity);
    }
    findMany(filter: FilterQuery<E>) {
      return this.repo.find(filter);
    }

    findOne(filter: FilterQuery<E>) {
      return this.repo.findOneOrFail(filter);
    }
    async deleteById(id: string) {
      const entity = await this.findOne({
        $eq: {
          id,
        } as any,
      });

      entity.isDeleted = true;

      return this.repo.upsert(entity);
    }
  }

  return BaseRepository;
}
