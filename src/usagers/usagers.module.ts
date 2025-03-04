import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsagersService } from './usagers.service';
import { UsagersController } from './usagers.controller';
import { Usager } from './usager.model/usager.model';
import { User } from '../users/user.model/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Usager, User])],
  controllers: [UsagersController],
  providers: [UsagersService],
  exports: [UsagersService],
})
export class UsagersModule {}