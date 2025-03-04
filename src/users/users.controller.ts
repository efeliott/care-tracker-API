import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { RoleGuard } from '../auth/roles/roles.guard';
import { Permissions } from '../auth/decorators/roles.decorator/roles.decorator';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(RoleGuard)
  @Permissions('users:read') 
  getAllUsers() {
    return this.usersService.findAll();
  }

  @Get('profile')
  @UseGuards(RoleGuard)
  @Permissions('users:profile')
  getProfile(@Req() req) {
    return {
      message: 'Profil utilisateur accessible',
      user: req.user,
    };
  }
}