import { Migration } from '@mikro-orm/migrations';

export class Migration20240820160305 extends Migration {

  override async up(): Promise<void> {
    this.addSql('alter table "users" alter column "created_at" type timestamp using ("created_at"::timestamp);');
    this.addSql('alter table "users" alter column "created_at" set default \'Tue Aug 20 2024\';');
    this.addSql('alter table "users" alter column "updated_at" type timestamp using ("updated_at"::timestamp);');
    this.addSql('alter table "users" alter column "updated_at" set default \'Tue Aug 20 2024\';');
    this.addSql('alter table "users" alter column "deleted_at" type timestamp using ("deleted_at"::timestamp);');
    this.addSql('alter table "users" alter column "deleted_at" drop not null;');
    this.addSql('alter table "users" alter column "is_deleted" type boolean using ("is_deleted"::boolean);');
    this.addSql('alter table "users" alter column "is_deleted" drop not null;');
    this.addSql('alter table "users" alter column "first_name" type character varying using ("first_name"::character varying);');
    this.addSql('alter table "users" alter column "last_name" type character varying using ("last_name"::character varying);');
    this.addSql('alter table "users" alter column "email" type character varying using ("email"::character varying);');
  }

  override async down(): Promise<void> {
    this.addSql('alter table "users" alter column "created_at" type timestamp(6) using ("created_at"::timestamp(6));');
    this.addSql('alter table "users" alter column "created_at" set default \'2024-08-20 00:00:00\';');
    this.addSql('alter table "users" alter column "updated_at" type timestamp(6) using ("updated_at"::timestamp(6));');
    this.addSql('alter table "users" alter column "updated_at" set default \'2024-08-20 00:00:00\';');
    this.addSql('alter table "users" alter column "deleted_at" type timestamp(6) using ("deleted_at"::timestamp(6));');
    this.addSql('alter table "users" alter column "deleted_at" set not null;');
    this.addSql('alter table "users" alter column "is_deleted" type bool using ("is_deleted"::bool);');
    this.addSql('alter table "users" alter column "is_deleted" set not null;');
    this.addSql('alter table "users" alter column "first_name" type varchar using ("first_name"::varchar);');
    this.addSql('alter table "users" alter column "last_name" type varchar using ("last_name"::varchar);');
    this.addSql('alter table "users" alter column "email" type varchar using ("email"::varchar);');
  }

}
