import { config } from 'dotenv';
import * as path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

import { Answers } from '@/answers/entities/answers.entity';
import { Questions } from '@/questions/entities/questions.entity';
import { Tags } from '@/tags/entities/tags.entity';
import { Users } from '@/users/entities/users.entity';

config();

const isProd = process.env.NODE_ENV !== 'development';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: !isProd,
  logging: !isProd,
  entities: [Users, Questions, Answers, Tags],
  migrations: [path.join(__dirname, 'migrations/*.ts')],
  name: 'default',
};

export const postgresDataSource: DataSource = new DataSource(dataSourceOptions);
