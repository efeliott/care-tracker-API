import { Controller, Get, Put, Req, UseGuards, NotFoundException, UnauthorizedException, Body } from '@nestjs/common';
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

  @Get('me')
  @UseGuards(RoleGuard)
  @Permissions('users:profile')
  async getAuthenticatedUser(@Req() req) {
    const userId = req.user.id;
    if (!userId) {
      throw new UnauthorizedException("Utilisateur non authentifié.");
    }
  
    const user = await this.usersService.findOneById(userId);
    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'ID ${userId} non trouvé.`);
    }
  
    return user;
  }

  @Put('me')
  @UseGuards(RoleGuard)
  @Permissions('users:update')
  async updateProfile(@Req() req, @Body() updateData: any) {
    const userId = req.user.id;
    return this.usersService.updateProfile(userId, updateData);
  }
}