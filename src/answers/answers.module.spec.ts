import { APP_GUARD } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { testDataSourceOptions } from '@/config/postgres/postgres-test.configuration';
import { RolesGuard } from '@/roles/guards/roles.guard';

import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';
import { Answers } from './entities/answers.entity';

describe('AnswersController', () => {
  let controller: AnswersController;
  let service: AnswersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Answers]), TypeOrmModule.forRoot(testDataSourceOptions)],
      controllers: [AnswersController],
      providers: [
        AnswersService,
        {
          provide: APP_GUARD,
          useClass: JwtAuthGuard,
        },
        {
          provide: APP_GUARD,
          useClass: RolesGuard,
        },
      ],
    }).compile();

    controller = module.get<AnswersController>(AnswersController);
    service = module.get<AnswersService>(AnswersService);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });
});
