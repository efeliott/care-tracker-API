import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PointagesService } from './pointages.service';
import { PointagesController } from './pointages.controller';
import { Pointage } from './pointage.model/pointage.model';
import { Task } from '../tasks/task.model/task.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Pointage, Task])
  ],
  controllers: [PointagesController],
  providers: [PointagesService],
  exports: [PointagesService]
})
export class PointagesModule {}
