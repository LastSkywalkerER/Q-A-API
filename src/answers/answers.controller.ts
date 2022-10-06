import { Body, Controller, Delete, Get, Param, Patch, Post, Request } from '@nestjs/common';

import { Public } from '@/auth/Public.decorator';
import { Roles } from '@/roles/roles.decorator';
import { Roles as RolesEnum } from '@/roles/roles.enum';
import { UserInRequest } from '@/users/users.types';

import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

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

  @Patch('update')
  @Roles(RolesEnum.Admin, RolesEnum.Owner)
  async update(@Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answersService.update(updateAnswerDto);
  }

  @Delete('remove/:id')
  @Roles(RolesEnum.Admin, RolesEnum.Owner)
  async remove(@Param('id') id: string) {
    return this.answersService.remove(id);
  }

  @Get('upvote/:id')
  async upvote(@Param('id') id: string) {
    return this.answersService.upvote(id);
  }

  @Get('downvote/:id')
  async downvote(@Param('id') id: string) {
    return this.answersService.downvote(id);
  }
}
