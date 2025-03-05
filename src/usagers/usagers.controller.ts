import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { RoleGuard } from '../auth/roles/roles.guard';
import { Permissions } from '../auth/decorators/roles.decorator/roles.decorator';
import { UsagersService } from './usagers.service';
import { Usager } from './usager.model/usager.model';

@Controller('usagers')
export class UsagersController {
  constructor(private readonly usagersService: UsagersService) {}

  @Post()
  @UseGuards(RoleGuard)
  @Permissions('usagers:create')
  async createUsager(@Req() req, @Body() usagerData: Partial<Usager & { nom: string; prenom: string; email: string; date_naissance: Date; tel: string }>) {
    console.log("Utilisateur qui crée l'usager:", req.user);
  
    const adminId = req.user.id;
    const adminEtablissementId = req.user.etablissement_id;
  
    return this.usagersService.createUsager(adminId, adminEtablissementId, usagerData);
  }  

  @Get('me')
  @UseGuards(RoleGuard)
  @Permissions('users:profile')
  async getMyUsagerProfile(@Req() req) {
    return this.usagersService.getUsagerByUserId(req.user.id);
  }
}