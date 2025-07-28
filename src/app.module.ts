import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { BoardsModule } from './modules/boards/boards.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { WebSocketModule } from './modules/websockets/websocket.module';
import { HealthCheckModule } from './modules/health-check/health-check.module';
 
@Module({
  imports: [UsersModule, RolesModule, BoardsModule, TasksModule,WebSocketModule, HealthCheckModule],
  controllers: [ ],
  providers: [ ],
})
export class AppModule {}
