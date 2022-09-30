import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './users.entity';

dotenv.config();

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async create(user: CreateUserDto): Promise<Users> {
    const checkUser = this.usersRepository.findBy({ email: user.email, userName: user.userName });

    if (checkUser) {
      throw new HttpException('User already exists', HttpStatus.NOT_ACCEPTABLE);
    }

    const hashedPassword = await bcrypt.hash(user.password, Number(process.env.BCRYPT_ROUNDS));

    return this.usersRepository.save({ ...user, password: hashedPassword });
  }

  findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  findOne(email: string): Promise<Users> {
    return this.usersRepository.findOneBy({ email });
  }

  async remove(email: string): Promise<void> {
    await this.usersRepository.delete({ email });
  }
}