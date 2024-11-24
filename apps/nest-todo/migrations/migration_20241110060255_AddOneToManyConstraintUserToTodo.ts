import { Migration } from '@mikro-orm/migrations';

export class Migration20241110060255_AddOneToManyConstraintUserToTodo extends Migration {
  override async up(): Promise<void> {
    this.addSql(`
      ALTER TABLE "todo" 
      ADD COLUMN assignee_id UUID NOT NULL,
      ADD CONSTRAINT assignee_constraint 
      FOREIGN KEY (assignee_id) REFERENCES users(id);
`);
  }

  override async down(): Promise<void> {
    this.addSql(`
    ALTER TABLE 'todo'
    DROP CONSTRAINT assignee_constraint;

`);
  }
}
