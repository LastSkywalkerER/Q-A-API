import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';

import { AuthService } from '@/auth/auth.service';
import { Public } from '@/auth/decorators/public.decorator';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from '@/auth/guards/local-auth.guard';
import { Roles } from '@/roles/decorators/roles.decorator';
import { RolesGuard } from '@/roles/guards/roles.guard';
import { Roles as RolesEnum } from '@/roles/types/roles.enum';

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

  @Get('upgrade/:email')
  @Roles(RolesEnum.Admin)
  async upgrade(@Param('email') email: string) {
    return this.usersService.upgrade(email);
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
