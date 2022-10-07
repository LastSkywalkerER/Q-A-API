import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { Roles } from '@/roles/types/roles.enum';

import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './entities/users.entity';

dotenv.config();

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async create(user: CreateUserDto): Promise<Users> {
    const [checkUser] = await this.usersRepository.findBy({ email: user.email, userName: user.userName });

    if (checkUser) {
      throw new HttpException('User already exists', HttpStatus.NOT_ACCEPTABLE);
    }

    const hashedPassword = await bcrypt.hash(user.password, Number(process.env.BCRYPT_ROUNDS));

    return this.usersRepository.save({ ...user, password: hashedPassword, role: Roles.User });
  }

  async upgrade(email: string): Promise<UpdateResult> {
    return this.usersRepository.update({ email }, { role: Roles.Admin });
  }

  getAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  getOne(email: string): Promise<Users> {
    return this.usersRepository.findOneBy({ email });
  }

  async remove(email: string): Promise<DeleteResult> {
    return this.usersRepository.delete({ email });
  }
}
