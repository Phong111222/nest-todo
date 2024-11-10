import { Migration } from '@mikro-orm/migrations';

export class Migration20241109092308_SetUserEmailUnique extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `
    DELETE FROM users
    USING users AS t2
    WHERE users.email = t2.email
      AND users.id > t2.id;

      ALTER TABLE "users" ADD CONSTRAINT user_email UNIQUE (email);

    `,
    );
  }

  override async down(): Promise<void> {
    this.addSql('alter table "users" drop constraint "user_email";');
  }
}
