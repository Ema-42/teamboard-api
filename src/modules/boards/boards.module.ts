import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../users/guards/auth-guard.guard';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [BoardsController],
  providers: [BoardsService, PrismaService, JwtAuthGuard],
})
export class BoardsModule {}
