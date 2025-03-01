import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: '193.203.168.207',
      port: 3306,
      username: 'u103016661_admin',
      password: '?UfEXd]vG0',
      database: 'u103016661_aidora',
      autoLoadModels: true,
      synchronize: true,
    }),
    AuthModule,
  ],
})
export class AppModule {}