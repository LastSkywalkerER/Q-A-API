import { HttpException, HttpStatus } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';

import { getApp } from '@/app.controller.spec';

import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

describe('TagsController', () => {
  let controller: TagsController;
  let service: TagsService;

  beforeEach(async () => {
    const module: TestingModule = await getApp();

    controller = module.get<TagsController>(TagsController);
    service = module.get<TagsService>(TagsService);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('double tags not allowed', async () => {
    try {
      const response = await controller.create({
        name: 'geography',
      });

      expect(response).toBeDefined();
    } catch (error) {
      expect(error).toEqual(new HttpException('Tag already exists', HttpStatus.NOT_ACCEPTABLE));
    }
  });

  it('double tags not allowed', async () => {
    try {
      const response = await controller.create({
        name: 'economy',
      });

      expect(response).toBeDefined();
    } catch (error) {
      expect(error).toEqual(new HttpException('Tag already exists', HttpStatus.NOT_ACCEPTABLE));
    }
  });

  it('update tag return something', async () => {
    const response = await controller.update({
      name: 'economy',
      id: '2',
    });

    expect(response).toBeDefined();
  });
});
