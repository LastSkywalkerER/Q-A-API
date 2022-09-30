import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';

import { AuthService } from '@/auth/auth.service';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { LocalAuthGuard } from '@/auth/local-auth.guard';

import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService, private authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: { user: GetUserDto }) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':email')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get()
  async getAll() {
    return this.usersService.findAll();
  }
}