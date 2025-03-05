import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsagersService } from './usagers.service';
import { UsagersController } from './usagers.controller';
import { Usager } from './usager.model/usager.model';
import { User } from '../users/user.model/user.model';
import { Planning } from '../plannings/planning.model/planning.model';

@Module({
  imports: [SequelizeModule.forFeature([Usager, User, Planning])],
  controllers: [UsagersController],
  providers: [UsagersService],
  exports: [UsagersService],
})
export class UsagersModule {}