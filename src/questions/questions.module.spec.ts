import { TestingModule } from '@nestjs/testing';

import { getApp, userFromToken } from '@/app.controller.spec';

import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';

describe('QuestionsController', () => {
  let controller: QuestionsController;
  let service: QuestionsService;

  beforeEach(async () => {
    const module: TestingModule = await getApp();

    controller = module.get<QuestionsController>(QuestionsController);
    service = module.get<QuestionsService>(QuestionsService);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create question return object', async () => {
    const response = await controller.create(
      {
        title: 'Capital of Great Britain',
        description: 'What is the capital of Great Britain?',
        tags: [{ id: '1', name: 'geography' }],
      },
      userFromToken,
    );

    expect(response).toBeDefined();
  });

  it('get all question return array', async () => {
    const response = await controller.getAll();

    expect(response).toBeInstanceOf(Array);
  });

  it('update question return something', async () => {
    const response = await controller.update({
      title: 'Capital of Great Britain',
      description: 'What is the capital of Great Britain?',
      tags: [{ id: '1', name: 'geography' }],
      id: '3',
    });

    expect(response).toBeDefined();
  });
});
