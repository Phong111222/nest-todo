import { EnvSchema } from '@app/shared/common/env';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({})
export class EnvModule {
  static register(envPath?: string): DynamicModule {
    return {
      module: EnvModule,
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: [envPath, '.env'],
          validate(config) {
            return EnvSchema.parse(config);
          },
        }),
      ],
    };
  }
}
