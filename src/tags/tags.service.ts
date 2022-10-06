import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tags } from './tags.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tags)
    private tagsRepository: Repository<Tags>,
  ) {}

  async create(tag: CreateTagDto): Promise<Tags> {
    const [checkTag] = await this.tagsRepository.findBy({ name: tag.name });

    if (checkTag) {
      throw new HttpException('Tag already exists', HttpStatus.NOT_ACCEPTABLE);
    }

    return this.tagsRepository.save(tag);
  }

  async getAll(): Promise<Tags[]> {
    return this.tagsRepository.find();
  }

  async update(tag: UpdateTagDto): Promise<UpdateResult> {
    return this.tagsRepository.update({ id: tag.id }, tag);
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.tagsRepository.delete({ id });
  }
}
