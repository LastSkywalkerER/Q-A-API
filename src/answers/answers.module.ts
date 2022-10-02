import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnswersController } from './answers.controller';
import { Answers } from './answers.entity';
import { AnswersService } from './answers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Answers])],
  controllers: [AnswersController],
  providers: [AnswersService],
})
export class AnswersModule {}
