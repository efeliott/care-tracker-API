import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { ProtectedModule } from './protected/protected.module';
import { UsersModule } from './users/users.module';

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
    ProtectedModule,
    UsersModule,
  ],
})
export class AppModule {}