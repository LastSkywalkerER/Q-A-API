import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { Roles } from '@/roles/decorators/roles.decorator';
import { Roles as RolesEnum } from '@/roles/types/roles.enum';

import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Post('create')
  @Roles(RolesEnum.Admin)
  async create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @Get()
  async getAll() {
    return this.tagsService.getAll();
  }

  @Patch('update')
  @Roles(RolesEnum.Admin)
  async update(@Body() updateTagDto: UpdateTagDto) {
    return this.tagsService.update(updateTagDto);
  }

  @Delete('remove/:id')
  @Roles(RolesEnum.Admin)
  async remove(@Param('id') id: string) {
    return this.tagsService.remove(id);
  }
}
