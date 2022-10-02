import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateQuestionDto } from './dto/create-question.dto';
import { Questions } from './questions.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Questions)
    private questionsRepository: Repository<Questions>,
  ) {}

  async create(question: CreateQuestionDto, author: string): Promise<Questions> {
    const date = new Date().toISOString();

    return this.questionsRepository.save({ ...question, author, rating: 0, dateOfCreation: date, dateOfUpdate: date });
  }

  getAll(): Promise<Questions[]> {
    return this.questionsRepository.find();
  }

  getOne(id: string): Promise<Questions> {
    return this.questionsRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.questionsRepository.delete({ id });
  }
}
