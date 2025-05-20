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
        where: { ownerId },
        include: { tasks: true },
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

  create(createBoardDto: CreateBoardDto) {
    return 'This action adds a new board';
  }

  findAll() {
    return `This action returns all boards`;
  }

  findOne(id: number) {
    return `This action returns a #${id} board`;
  }

  update(id: number, updateBoardDto: UpdateBoardDto) {
    return `This action updates a #${id} board`;
  }

  remove(id: number) {
    return `This action removes a #${id} board`;
  }
}
