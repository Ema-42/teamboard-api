import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {

    try {
      const newTask = await this.prisma.tasks.create({
        data: createTaskDto,
      });
      return {
        status: 'success',
        data: newTask,
      };
    } catch (error) {
      return {
        status: 'error',
        error: error.message || 'Error al crear la tarea',
      };
    }
  }

  findAll() {
    return `This action returns all tasks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    try {
      const updatedTask = await this.prisma.tasks.update({
        where: { id },
        data: updateTaskDto,
      });
      return {
        status: 'success',
        data: updatedTask,
      };
    } catch (error) {
      return {
        status: 'error',
        error: error.message || 'Error al actualizar la tarea',
      };
    }
  }

  async remove(id: string) {
    try {
      const deletedTask = await this.prisma.tasks.update({
        where: { id },
        data: { deleted: true },
      });
      return {
        status: 'success',
        data: deletedTask,
      };
    } catch (error) {
      return {
        status: 'error',
        error: error.message || 'Error al marcar la tarea como eliminada',
      };
    }
  }
}
