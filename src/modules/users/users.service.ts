import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany({ where: { deleted: false } });
  }

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.prisma.user.create({ data: createUserDto });
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id, deleted: false },
      select: {
        id: true,
        email: true,
        name: true,
        estado: true,
        createdAt: true,
        updatedAt: true,
        role: true,
      },
    });

    if (!user) {
      throw new Error(`User with ID ${id} not found or has been deleted`);
    }

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
