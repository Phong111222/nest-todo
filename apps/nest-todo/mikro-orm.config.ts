import { defineConfig, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import env from '@dotenvx/dotenvx';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { EntityGenerator } from '@mikro-orm/entity-generator';
import { Todo } from '@app/shared/models/todo/todo.entity';
import { Status } from '@app/shared/models/status/status.entity';
import { User } from '@app/shared/models/users/users.entity';

const config = (() => {
  env.config({
    path: './.env',
  });
  const entities = [User, Todo, Status];
  return defineConfig({
    entities,
    entitiesTs: entities,
    debug: true,
    extensions: [Migrator, EntityGenerator],
    dbName: process.env['DB_NAME'],
    password: process.env['DB_PASSWORD'],
    user: process.env['DB_USER_NAME'],
    host: process.env['DB_HOST'],
    port: Number(process.env['DB_PORT']),
    driver: PostgreSqlDriver,
    metadataProvider: TsMorphMetadataProvider,
    migrations: {
      tableName: 'migration', // name of database table with log of executed transactions
      path: './migrations', // path to the folder with migrations
      pathTs: './migrations', // path to the folder with migrations
      glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
      transactional: true, // wrap each migration in a transaction
      disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
      allOrNothing: true, // wrap all migrations in master transaction
      safe: false, // allow to disable table and column dropping
      snapshot: true, // save snapshot when creating new migrations
      fileName(timestamp, name) {
        return `migration_${timestamp}${name ? '_' + name : ''}`;
      },
    },
  });
})();

export default config;
