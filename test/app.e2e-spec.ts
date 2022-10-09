import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200).expect('Hello World!');
  });

  it('/users/login (POST) return token', async () => {
    const response = await request(app.getHttpServer()).post('/users/login').send({
      email: 'maxdr1998@gmail.com',
      password: '1234',
    });

    token = response.body.access_token;

    expect(response.status).toEqual(HttpStatus.CREATED);
    expect(token.length).toBeGreaterThan(0);
  });

  it('/tags/create (POST) not allowed for user', async () => {
    const response = await request(app.getHttpServer())
      .post('/tags/create')
      .set('Authorization', 'Bearer ' + token)
      .set({})
      .send({
        name: 'economy',
      });

    expect(response.status).toEqual(HttpStatus.FORBIDDEN);
  });
});
