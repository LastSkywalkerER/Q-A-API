import { Body, Controller, Delete, Get, Param, Patch, Post, Request } from '@nestjs/common';

import { AnswersService } from '@/answers/answers.service';
import { Public } from '@/auth/decorators/public.decorator';
import { Roles } from '@/roles/decorators/roles.decorator';
import { Roles as RolesEnum } from '@/roles/types/roles.enum';
import { UserInRequest } from '@/users/types/users.types';

import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private questionsService: QuestionsService, private answersService: AnswersService) {}

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
  @Get('byTag/:partialTag')
  getByTag(@Param('partialTag') partialTag: string) {
    return this.questionsService.getAllByTag(partialTag);
  }

  @Public()
  @Get(':id')
  async getOne(@Param('id') id: string) {
    const question = await this.questionsService.getOne(id);
    const answers = await this.answersService.getAll(id);

    return { question, answers };
  }

  @Patch('update')
  @Roles(RolesEnum.Admin, RolesEnum.Owner)
  async update(@Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionsService.update(updateQuestionDto);
  }

  @Delete('remove/:id')
  @Roles(RolesEnum.Admin, RolesEnum.Owner)
  async remove(@Param('id') id: string) {
    return this.questionsService.remove(id);
  }

  @Get('upvote/:id')
  async upvote(@Param('id') id: string) {
    return this.questionsService.upvote(id);
  }

  @Get('downvote/:id')
  async downvote(@Param('id') id: string) {
    return this.questionsService.downvote(id);
  }
}
