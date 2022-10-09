import { TestingModule } from '@nestjs/testing';

import { getApp, userFromToken } from '@/app.controller.spec';

import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';

describe('AnswersController', () => {
  let controller: AnswersController;
  let service: AnswersService;

  beforeEach(async () => {
    const module: TestingModule = await getApp();

    controller = module.get<AnswersController>(AnswersController);
    service = module.get<AnswersService>(AnswersService);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create answer return object', async () => {
    const response = await controller.create({ questionId: '3', text: 'London is the capital of great Britain' }, userFromToken);

    expect(response).toBeDefined();
  });

  it('update answer return something', async () => {
    const response = await controller.update({ text: 'London is the capital of great Britain', id: '1' });

    expect(response).toBeDefined();
  });
});
