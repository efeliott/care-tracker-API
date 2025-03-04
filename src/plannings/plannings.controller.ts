import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { PlanningsService } from './plannings.service';
import { RoleGuard } from '../auth/roles/roles.guard';
import { Permissions } from '../auth/decorators/roles.decorator/roles.decorator';
import { CreatePlanningDto } from './dto/create-planning.dto/create-planning.dto';

@Controller('plannings')
export class PlanningsController {
  constructor(private readonly planningsService: PlanningsService) {}

  @Post()
  @UseGuards(RoleGuard)
  @Permissions('plannings:create')
  createPlanning(@Req() req, @Body() createPlanningDto: CreatePlanningDto) {
    return this.planningsService.createPlanning(req.user, createPlanningDto);
  }

  @Get()
  @UseGuards(RoleGuard)
  @Permissions('plannings:read')
  getAllPlannings(@Req() req) {
    return this.planningsService.getPlannings(req.user);
  }
}