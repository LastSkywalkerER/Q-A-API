import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnswersService } from '@/answers/answers.service';
import { Answers } from '@/answers/entities/answers.entity';

import { Questions } from './entities/questions.entity';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Questions, Answers])],
  controllers: [QuestionsController],
  providers: [QuestionsService, AnswersService],
})
export class QuestionsModule {}
