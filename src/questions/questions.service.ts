import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Questions } from './entities/questions.entity';

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
    return this.questionsRepository.find({
      relations: {
        tags: true,
      },
    });
  }

  async getAllByTag(partialTag: string): Promise<Questions[]> {
    const dbQuestions = await this.questionsRepository.find({
      relations: {
        tags: true,
      },
    });

    return dbQuestions.filter((question) => question.tags.find((tag) => tag.name.includes(partialTag)));
  }

  getOne(id: string): Promise<Questions> {
    return this.questionsRepository.findOne({
      where: { id },
      relations: {
        tags: true,
      },
    });
  }

  async update(question: UpdateQuestionDto): Promise<UpdateResult | Questions> {
    const date = new Date().toISOString();
    const { tags, ...restQuestion } = question;

    if (question.tags) {
      const actualRelationships = await this.questionsRepository
        .createQueryBuilder()
        .relation(Questions, 'tags')
        .of(question)
        .loadMany();

      await this.questionsRepository
        .createQueryBuilder()
        .relation(Questions, 'tags')
        .of(question)
        .addAndRemove(tags, actualRelationships);
    }

    return this.questionsRepository.update({ id: question.id }, { ...restQuestion, dateOfUpdate: date });
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.questionsRepository.delete({ id });
  }

  async upvote(id: string): Promise<UpdateResult> {
    const question = await this.questionsRepository.findOneBy({ id });

    return this.questionsRepository.update({ id }, { rating: question.rating + 1 });
  }

  async downvote(id: string): Promise<UpdateResult> {
    const question = await this.questionsRepository.findOneBy({ id });

    if (question.rating > 0) {
      return this.questionsRepository.update({ id }, { rating: question.rating - 1 });
    }
  }
}
