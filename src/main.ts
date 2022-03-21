import { NestFactory } from '@nestjs/core';
import * as config from './config';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  //await app.listen(3200);
  await app.listen(config.APP_PORT, config.HOSTNAME);
  logger.log(
    `Application can be accessed on http://${config.HOSTNAME}:${config.APP_PORT} `,
  );
}
bootstrap();
