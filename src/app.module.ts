import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { PlanningsModule } from './plannings/plannings.module';
import { ProtectedModule } from './protected/protected.module';
import { User } from './users/user.model/user.model';
import { Task } from './tasks/task.model/task.model';
import { Planning } from './plannings/planning.model/planning.model';
import { RoleGuard } from './auth/roles/roles.guard';
import { JwtService } from '@nestjs/jwt';
import { PointagesModule } from './pointages/pointages.module';
import { Pointage } from './pointages/pointage.model/pointage.model';
import { UsagersModule } from './usagers/usagers.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    AuthModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      synchronize: false,
    }),
    SequelizeModule.forFeature([User, Task, Planning, Pointage]),
    UsersModule,
    TasksModule,
    PlanningsModule,
    ProtectedModule,
    PointagesModule,
    UsagersModule,
  ],
  providers: [RoleGuard, JwtService],
  exports: [RoleGuard, JwtService],
})
export class AppModule {}