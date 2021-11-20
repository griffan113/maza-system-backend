import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './shared/app.module';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const port = process.env.PORT;

  const app = await NestFactory.create(AppModule);
  await app.listen(port);

  logger.log('Application listening on port: ' + port);
}
bootstrap();
