import { Migration } from '@mikro-orm/migrations';

export class Migration20240825055555 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      'create table "status" ("id" uuid not null, "created_at" timestamp not null default \'Tue Aug 20 2024\', "updated_at" timestamp not null default \'Tue Aug 20 2024\', "deleted_at" timestamp null, "created_by" varchar(255) null, "is_deleted" boolean null default false, "name" varchar(255) not null, "color" varchar(255) not null, constraint "status_pkey" primary key ("id"));',
    );

    this.addSql(
      'create table "todo" ("id" uuid not null, "created_at" timestamp not null default \'Tue Aug 20 2024\', "updated_at" timestamp not null default \'Tue Aug 20 2024\', "deleted_at" timestamp null, "created_by" varchar(255) null, "is_deleted" boolean null default false, "title" varchar(255) not null, "description" varchar(255) not null, "current_status_id" uuid null, constraint "todo_pkey" primary key ("id"));',
    );

    this.addSql(
      'alter table "todo" add constraint "todo_current_status_id_foreign" foreign key ("current_status_id") references "status" ("id") on update cascade on delete set null;',
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      'alter table "todo" drop constraint "todo_current_status_id_foreign";',
    );

    this.addSql('drop table if exists "status" cascade;');

    this.addSql('drop table if exists "todo" cascade;');
  }
}
