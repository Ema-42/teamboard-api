import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { GoogleRegisterDto } from './dto/google-register.dto';

import { OAuth2Client } from 'google-auth-library';
import { GoogleLoginDto } from './dto/google-login.dto';
import { JwtService } from '@nestjs/jwt';
import { hashPassword } from './utils/hashear-password';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async findAll() {
    const users = await this.prisma.user.findMany({
      where: { deleted: false },
    });
    return {
      status: 'success',
      data: users,
    };
  }

  async emailExists(email: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return !!user;
  }

  async register(createUserDto: CreateUserDto) {
    const emailExists = await this.emailExists(createUserDto.email);
    if (emailExists) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Ya existe un usuario con ese correo electrónico',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const hashedPassword = await hashPassword(createUserDto.password);

      const userData = {
        ...createUserDto,
        password: hashedPassword,
      };
      const newUser = await this.prisma.user.create({ data: userData });

      const token = this.generateJwt(newUser);

      return {
        token,
        user: {
          name: newUser.name,
          email: newUser.email,
          picture: newUser.picture,
          role: newUser.roleId,
        },
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `Error: ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!user || user.deleted) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          message: 'Correo o contraseña incorrectos',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          message: 'Correo o contraseña incorrectos',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    const token = this.generateJwt(user);

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        role: user.roleId,
      },
    };
  }

  async verifyAndDecodeGoogleJwt(googleRegisterDto: GoogleRegisterDto) {
    const { jwt } = googleRegisterDto;
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    try {
      const ticket = await client.verifyIdToken({
        idToken: jwt,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();

      return payload;
    } catch (error) {
      console.log('Token inválido:', error.message);
      return null; // Retorna null si el token es inválido
    }
  }

  async registerWithGoogle(payload: any) {
    const dataUser = await this.verifyAndDecodeGoogleJwt(payload);
    const { email, given_name, picture, sub } = dataUser;
    // Verificar si el email ya está registrado en la base de datos
    const emailExists = await this.emailExists(email);
    if (emailExists) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Ya existe un usuario con ese correo electrónico',
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      // Si el usuario no existe, se crea uno nuevo
      try {
        const hashedPassword = await hashPassword(sub);
        const userData = {
          email,
          name: `${given_name}`,
          password: hashedPassword,
          picture: picture,
        };

        const newUser = await this.prisma.user.create({
          data: userData,
        });
        const token = this.generateJwt(newUser);
        return {
          token,
          user: {
            name: newUser.name,
            email: newUser.email,
            picture: newUser.picture,
            role: newUser.roleId,
          },
        };
      } catch (error) {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: `Error: ${error.message}`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async loginWithGoogle(googleDto: GoogleLoginDto) {
    const payload = await this.verifyAndDecodeGoogleJwt(googleDto);

    if (!payload) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          message: 'Token de Google inválido',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    const user = await this.findOrCreateGoogleUser(payload);
    const token = this.generateJwt(user);

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        role: user.roleId,
      },
    };
  }

  async findOrCreateGoogleUser(payload: any) {
    const { email, given_name, picture, sub } = payload;

    let user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      const hashedPassword = await hashPassword(sub);
      user = await this.prisma.user.create({
        data: {
          email,
          name: given_name,
          picture,
          password: hashedPassword,
        },
      });
    }

    return user;
  }

  generateJwt(user: any) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.roleId,
    };
    return this.jwtService.sign(payload);
  }
}
