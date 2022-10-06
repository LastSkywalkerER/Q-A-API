import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

import { Answers } from './answers/answers.entity';
import { AnswersModule } from './answers/answers.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Questions } from './questions/questions.entity';
import { QuestionsModule } from './questions/questions.module';
import { RolesGuard } from './roles/roles.guard';
import { Tags } from './tags/tags.entity';
import { TagsModule } from './tags/tags.module';
import { Users } from './users/users.entity';
import { UsersModule } from './users/users.module';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [Users, Questions, Answers, Tags],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    QuestionsModule,
    AnswersModule,
    TagsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
