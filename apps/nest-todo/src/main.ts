import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { EnvConfig } from '@app/shared/common/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService<EnvConfig>>(ConfigService);
  const logger = new Logger();
  const PORT = Number(configService.get('APP_PORT'));

  logger.log(`[App is using PORT] ${PORT}`);

  await app.listen(PORT);
}
bootstrap();
