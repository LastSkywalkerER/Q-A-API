import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Answers } from './entities/answers.entity';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answers)
    private answersRepository: Repository<Answers>,
  ) {}

  async create(question: CreateAnswerDto, author: string): Promise<Answers> {
    const date = new Date().toISOString();

    return this.answersRepository.save({ ...question, author, rating: 0, dateOfCreation: date, dateOfUpdate: date });
  }

  getAll(questionId: string): Promise<Answers[]> {
    return this.answersRepository.findBy({ questionId });
  }

  async update(question: UpdateAnswerDto): Promise<UpdateResult> {
    const date = new Date().toISOString();

    return this.answersRepository.update({ id: question.id }, { ...question, dateOfUpdate: date });
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.answersRepository.delete({ id });
  }

  async upvote(id: string): Promise<UpdateResult> {
    const answer = await this.answersRepository.findOneBy({ id });

    return this.answersRepository.update({ id }, { rating: answer.rating + 1 });
  }

  async downvote(id: string): Promise<UpdateResult> {
    const answer = await this.answersRepository.findOneBy({ id });

    if (answer.rating > 0) {
      return this.answersRepository.update({ id }, { rating: answer.rating - 1 });
    }
  }
}
