import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { BoardsModule } from './modules/boards/boards.module';
 
@Module({
  imports: [UsersModule, RolesModule, BoardsModule],
  controllers: [ ],
  providers: [ ],
})
export class AppModule {}
