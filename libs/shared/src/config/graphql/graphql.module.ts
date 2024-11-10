import { DynamicModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
@Module({
  imports: [],
  providers: [],
})
export class AppGraphqlModule {
  static register(schemaPath: string): DynamicModule {
    return {
      module: AppGraphqlModule,
      imports: [
        GraphQLModule.forRoot({
          driver: ApolloDriver,
          autoSchemaFile: schemaPath,
          debug: true,
          sortSchema: true,
          playground: false,
          plugins: [ApolloServerPluginLandingPageLocalDefault()],
        }),
      ],
      exports: [GraphQLModule],
      providers: [],
    };
  }
}
