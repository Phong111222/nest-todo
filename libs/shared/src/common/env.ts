import * as zod from 'zod';

export const EnvSchema = zod.object({
  DB_HOST: zod.string(),
  DB_PORT: zod.string(),
  DB_USER_NAME: zod.string(),
  DB_PASSWORD: zod.string(),
  APP_PORT: zod.string(),
  DB_NAME: zod.string(),
});

export type EnvConfig = zod.infer<typeof EnvSchema>;
