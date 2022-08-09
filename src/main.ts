import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import helmet from 'helmet';

import { AppModule } from '@shared/app.module';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const port = process.env.PORT || 3000;

  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  await app.listen(port);

  logger.log('Application listening on port: ' + port);
}
bootstrap();
