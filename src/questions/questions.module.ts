import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Answers } from '@/answers/answers.entity';
import { AnswersService } from '@/answers/answers.service';

import { QuestionsController } from './questions.controller';
import { Questions } from './questions.entity';
import { QuestionsService } from './questions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Questions, Answers])],
  controllers: [QuestionsController],
  providers: [QuestionsService, AnswersService],
})
export class QuestionsModule {}
