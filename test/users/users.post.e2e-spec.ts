import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { dropDatabase } from 'test/helpers/dropDatabase';
import { bootstrapApllicationNest } from 'test/helpers/bootstrap-nest-application.helper';

import * as request from 'supertest';
import { App } from 'supertest/types';
import {
  completeUser,
  missingEmail,
  missingFirstName,
  missingPassword,
} from './uses.post.e2e-spec.sample-data';

describe('[Users] @Post Endpoints', () => {
  let app: INestApplication;
  let config: ConfigService;
  let httpServer: App;

  beforeEach(async () => {
    app = await bootstrapApllicationNest(); // create app

    config = app.get<ConfigService>(ConfigService); // get config from the module

    httpServer = app.getHttpServer(); // get Httpserver
  });

  afterEach(async () => {
    await dropDatabase(config); // drop the database
    await app.close(); // end app
  });

  //   steps
  it('/user - public endpoints', () => {
    return request(httpServer).post('/users/create').send({}).expect(400);
  });

  // test missing firstName
  it('/users/create - firstName is mandatory', () => {
    return request(httpServer)
      .post('/users/create')
      .send(missingFirstName)
      .expect(400);
  });

  it('/users/create - email is mandatory', () => {
    return request(httpServer)
      .post('/users/create')
      .send(missingEmail)
      .expect(400);
  });

  it('/users/create - password is mandatory ', () => {
    return request(httpServer)
      .post('/users/create')
      .send(missingPassword)
      .expect(400);
  });

  it('/users/create - valid request successfully create user', () => {
    return request(httpServer)
      .post('/users/create')
      .send(completeUser)
      .expect(201)
      .then(({ body }) => {
        expect(body).toBeDefined();
        expect(body.data.firstName).toBe(completeUser.firstName);
        expect(body.data.lastName).toBe(completeUser.lastName);
        expect(body.data.email).toBe(completeUser.email);
      });
  });

  it('/users/create - password is not returned in response', () => {
    return request(httpServer)
      .post('/users/create')
      .send(completeUser)
      .expect(201)
      .then(({ body }) => {
        expect(body.data.password).toBeUndefined();
      });
  });
  it('/users/create - googleId is not returned in response', () => {
    return request(httpServer)
      .post('/users/create')
      .send(completeUser)
      .expect(201)
      .then(({ body }) => {
        expect(body.data.googleId).toBeUndefined();
      });
  });
});
