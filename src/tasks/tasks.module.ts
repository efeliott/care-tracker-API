import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './task.model/task.model';
import { AuthModule } from '../auth/auth.module';
import { RoleGuard } from '../auth/roles/roles.guard';

@Module({
  imports: [SequelizeModule.forFeature([Task]), AuthModule],
  controllers: [TasksController],
  providers: [TasksService, RoleGuard],
  exports: [TasksService],
})
export class TasksModule {}