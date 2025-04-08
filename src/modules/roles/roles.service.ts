import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  async roleExistsByName(name: string): Promise<boolean> {
    const role = await this.prisma.role.findUnique({
      where: {
        name,
      },
    });
    return !!role;
  }
  async create(createRoleDto: CreateRoleDto) {
    try {
      const existingRole = await this.roleExistsByName(createRoleDto.name);

      if (existingRole) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            message: `A role with the name '${createRoleDto.name}' already exists.`,
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const newRole = await this.prisma.role.create({
        data: createRoleDto,
      });
      return newRole;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `Failed to create role: ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    return this.prisma.role.findMany({
      where: {
        deleted: false,
      },
      select: {
        id: true,
        name: true,
        estado: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
