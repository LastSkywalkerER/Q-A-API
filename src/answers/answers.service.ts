import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Answers } from './answers.entity';
import { CreateAnswerDto } from './dto/create-answer.dto';

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

  async remove(id: string): Promise<void> {
    await this.answersRepository.delete({ id });
  }
}
