import { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DataResponseInterceptor } from './common/interceptors/data-response/data-response.interceptor';

export const appCreate = (app: INestApplication): void => {
  /**
   * set up validationpipe
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // property does not containt in dto will not be care in controller
      forbidNonWhitelisted: true, // throw exception if data does not match dto
      transform: true, // convert incoming request to DTO instance after validate
      transformOptions: {
        enableImplicitConversion: true, // implict convert to expect type
      },
    }),
  );

  /*
   * config swagger
   */
  const config: any = new DocumentBuilder()
    .setTitle('Api swagger UI')
    .setDescription('Base URL is: http://localhost:3000/api')
    .setVersion('1.0')
    .setTermsOfService('http://localhost:3000/term-service')
    .setLicense(
      'MIT lisence',
      'https://github.com/TranToan25092003/nestjs-tutorial.git',
    )
    .addServer('http://localhost:3000/')
    .build();
  const document: any = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  /*
   * end config swagger
   */

  app.enableCors(); // enable cors (to app out side can call api as react app or angular app)
};
