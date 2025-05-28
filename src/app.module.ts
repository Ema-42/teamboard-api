import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { BoardsModule } from './modules/boards/boards.module';
import { TasksModule } from './modules/tasks/tasks.module';
 
@Module({
  imports: [UsersModule, RolesModule, BoardsModule, TasksModule],
  controllers: [ ],
  providers: [ ],
})
export class AppModule {}
