import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appCreate } from './app.create';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  appCreate(app);

  await app.listen(3000);
}
bootstrap();

/**
 * extract middleware of application to be an function in order to reuse
 *
 * create new folder and file contain api you want to test
 *
 * setup bootstrap and drop database function
 *
 * setup faker to fake data
 *
 */
