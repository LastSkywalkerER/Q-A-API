import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';
import { Answers } from './entities/answers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Answers])],
  controllers: [AnswersController],
  providers: [AnswersService],
})
export class AnswersModule {}
