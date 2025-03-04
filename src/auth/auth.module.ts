import { Module, Global } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/user.model/user.model';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Planning } from '../plannings/planning.model/planning.model';
import { ConfigModule, ConfigService } from '@nestjs/config';
JwtModule.register({
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: '7d' },
})

@Global()
@Module({
  
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    SequelizeModule.forFeature([User, Planning]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');
        return {
          secret: secret || 'defaultSecret',
          signOptions: { expiresIn: '7d' },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService, JwtModule, PassportModule],
})
export class AuthModule {}