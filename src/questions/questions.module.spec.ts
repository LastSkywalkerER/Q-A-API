import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnswersService } from '@/answers/answers.service';
import { Answers } from '@/answers/entities/answers.entity';
import { testDataSourceOptions } from '@/config/postgres/postgres-test.configuration';

import { Questions } from './entities/questions.entity';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';

describe('QuestionsController', () => {
  let controller: QuestionsController;
  let service: QuestionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Questions, Answers]), TypeOrmModule.forRoot(testDataSourceOptions)],
      controllers: [QuestionsController],
      providers: [QuestionsService, AnswersService],
    }).compile();

    controller = module.get<QuestionsController>(QuestionsController);
    service = module.get<QuestionsService>(QuestionsService);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });
});
