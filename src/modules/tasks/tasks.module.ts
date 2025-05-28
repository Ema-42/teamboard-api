import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../users/guards/auth-guard.guard';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [TasksController],
  providers: [TasksService, PrismaService, JwtAuthGuard],
})
export class TasksModule {}
