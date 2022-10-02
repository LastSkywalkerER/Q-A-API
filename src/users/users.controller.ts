import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';

import { AuthService } from '@/auth/auth.service';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { LocalAuthGuard } from '@/auth/local-auth.guard';
import { Public } from '@/auth/Public.decorator';
import { Roles } from '@/roles/roles.decorator';
import { Roles as RolesEnum } from '@/roles/roles.enum';
import { RolesGuard } from '@/roles/roles.guard';

import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService, private authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: { user: GetUserDto }) {
    return this.authService.login(req.user);
  }

  @Get(':email')
  getProfile(@Param('email') email: string) {
    return this.usersService.getOne(email);
  }

  @Get()
  @Roles(RolesEnum.Admin)
  async getAll() {
    return this.usersService.getAll();
  }
}
