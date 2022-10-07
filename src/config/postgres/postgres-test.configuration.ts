import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';

import { Answers } from '@/answers/entities/answers.entity';
import { Questions } from '@/questions/entities/questions.entity';
import { Tags } from '@/tags/entities/tags.entity';
import { Users } from '@/users/entities/users.entity';

dotenv.config();

export const testDataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL_TEST,
  synchronize: true,
  logging: false,
  entities: [Users, Questions, Answers, Tags],
};
