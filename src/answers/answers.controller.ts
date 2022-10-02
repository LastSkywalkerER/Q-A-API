import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';

import { Public } from '@/auth/Public.decorator';
import { UserInRequest } from '@/users/users.types';

import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';

@Controller('answers')
export class AnswersController {
  constructor(private answersService: AnswersService) {}

  @Post('create')
  async create(@Body() createAnswerDto: CreateAnswerDto, @Request() { user }: UserInRequest) {
    return this.answersService.create(createAnswerDto, user.email);
  }

  @Public()
  @Get(':questionId')
  getAll(@Param('questionId') questionId: string) {
    return this.answersService.getAll(questionId);
  }
}
