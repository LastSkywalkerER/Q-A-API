import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';

import { Public } from '@/auth/Public.decorator';
import { UserInRequest } from '@/users/users.types';

import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private questionsService: QuestionsService) {}

  @Post('create')
  async create(@Body() createQuestionDto: CreateQuestionDto, @Request() { user }: UserInRequest) {
    return this.questionsService.create(createQuestionDto, user.email);
  }

  @Public()
  @Get()
  getAll() {
    return this.questionsService.getAll();
  }

  @Public()
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.questionsService.getOne(id);
  }
}
