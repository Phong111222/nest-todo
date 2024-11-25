import { Field, ObjectType, ArgsType } from '@nestjs/graphql';

interface ClassConstructor<T extends any> {
  new (...params: any[]): T;
}

@ObjectType({ description: 'PageInfo' })
class PageInfo {
  @Field({
    nullable: true,
  })
  hasPreviousPage: boolean;

  @Field({
    nullable: true,
  })
  hasNextPage: boolean;

  @Field({
    nullable: true,
  })
  startCursor: string;

  @Field({
    nullable: true,
  })
  endCursor: string;
}

@ObjectType({ description: 'Edge', isAbstract: true })
class Edge {
  @Field()
  cursor: string;
}

export const createEdge = <T>(entity: ClassConstructor<T>) => {
  @ObjectType({
    description: `${entity.name} edge`,
  })
  class ExtendedEged extends Edge {
    @Field(() => entity)
    node: T;
  }

  return ExtendedEged;
};

@ArgsType()
export class PaginationArgument {
  @Field({ nullable: true })
  before: string;
  @Field({ nullable: true })
  after: string;
  @Field({ nullable: true })
  first: number;
  @Field({ nullable: true })
  last: number;
}

@ObjectType({ description: 'Base Connection', isAbstract: true })
class BaseConnection {
  @Field(() => PageInfo)
  pageInfo: PageInfo;
}

export const createGplConnection = <T>(entity: ClassConstructor<T>) => {
  const edgeClassName = `${entity.name}Edge`;

  @ObjectType({
    description: edgeClassName,
  })
  class Edge extends createEdge(entity) {}
  Object.defineProperty(Edge, 'name', { value: edgeClassName });

  @ObjectType({ description: entity.name })
  class Connection extends BaseConnection {
    @Field(() => [Edge], {
      description: `$List edges of ${entity.name}`,
    })
    edges: Edge[];
  }
  return Connection;
};
