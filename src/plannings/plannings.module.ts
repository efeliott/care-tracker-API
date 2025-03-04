import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PlanningsService } from './plannings.service';
import { PlanningsController } from './plannings.controller';
import { Planning } from './planning.model/planning.model';

@Module({
  imports: [SequelizeModule.forFeature([Planning])],
  controllers: [PlanningsController],
  providers: [PlanningsService],
  exports: [PlanningsService],
})
export class PlanningsModule {} 