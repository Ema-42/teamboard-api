import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BoardsService {
  constructor(private prisma: PrismaService) {}

  async findUserBoards(ownerId: string) {
    try {
      const boards = await this.prisma.board.findMany({
        where: {
          deleted: false,
          OR: [
            { ownerId: ownerId },
            {
              members: {
                some: {
                  userId: ownerId,
                  deleted: false,
                },
              },
            },
          ],
        },
        include: {
          tasks: {
            where: { deleted: false },
            orderBy: { createdAt: 'asc' },
          },
          members: {
            where: { deleted: false },
            select: {
              user: {
                select: { id: true, name: true, email: true, picture: true },
              },
            },
          },
          owner: {
            select: { id: true, name: true, email: true, picture: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      if (!boards || boards.length === 0) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'No boards found for the given ownerId',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return boards;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'An error occurred while fetching the boards',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(createBoardDto: CreateBoardDto) {
    try {
      const board = await this.prisma.board.create({
        data: createBoardDto,
      });
      return {
        status: HttpStatus.CREATED,
        data: board,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'An error occurred while creating the board',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll() {
    return `This action returns all boards`;
  }

  findOne(id: number) {
    return `This action returns a #${id} board`;
  }

  async update(id: string, updateBoardDto: UpdateBoardDto) {
    try {
      const board = await this.prisma.board.update({
        where: { id },
        data: updateBoardDto,
      });
      return {
        status: HttpStatus.OK,
        data: board,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'An error occurred while updating the board',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    try {
      const board = await this.prisma.board.update({
        where: { id },
        data: { deleted: true },
      });
      return {
        status: HttpStatus.OK,
        data: board,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'An error occurred while deleting the board',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async boardShare(boardId: string, usersIdsDto: { usersIds: string[] }) {
    try {
      // Verificar que el board existe y no está eliminado
      const board = await this.prisma.board.findUnique({
        where: { id: boardId, deleted: false },
      });
      if (!board) {
        throw new HttpException(
          { status: HttpStatus.NOT_FOUND, message: 'Board not found' },
          HttpStatus.NOT_FOUND,
        );
      }
      // Insertar membresías
      const memberships = await Promise.all(
        usersIdsDto.usersIds.map(async (userId) => {
          return this.prisma.membership.create({
            data: {
              userId,
              boardId,
              role: 'admin',
              estado: 'active',
            },
          });
        }),
      );
      return {
        status: HttpStatus.CREATED,
        data: memberships,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Error sharing board',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
