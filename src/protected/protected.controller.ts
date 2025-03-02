import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';

@Controller('protected')
export class ProtectedController {
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req) {
    return { message: `Bienvenue, utilisateur ${req.user.id} avec rôle ${req.user.role}` };
  }
}