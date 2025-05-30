import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { GoogleRegisterDto } from './dto/google-register.dto';
import { GoogleLoginDto } from './dto/google-login.dto';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.usersService.login(loginDto);
  }

  @Post('google/register')
  googleRegister(@Body() jwt: GoogleRegisterDto) {
    return this.usersService.registerWithGoogle(jwt);
  }

  @Post('google/login')
  googleLogin(@Body() jwt: GoogleLoginDto) {
    return this.usersService.loginWithGoogle(jwt);
  }

  @Get('users')
  findAll() {
    return this.usersService.findAll();
  }

}
