import { Controller, Post, Param, Body, UseGuards, Req } from '@nestjs/common';
import { PointagesService } from './pointages.service';
import { RoleGuard } from '../auth/roles/roles.guard';
import { Permissions } from '../auth/decorators/roles.decorator/roles.decorator';

@Controller('pointages')
export class PointagesController {
  constructor(private readonly pointagesService: PointagesService) {}

  @Post('start/:taskId')
  @UseGuards(RoleGuard)
  @Permissions('pointages:create')
  startPointage(
    @Req() req,
    @Param('taskId') taskId: number,
    @Body('methode') methode: 'manuel' | 'NFC'
  ) {
    return this.pointagesService.startPointage(req.user, taskId, methode);
  }

  @Post('end/:taskId')
  @UseGuards(RoleGuard)
  @Permissions('pointages:update')
  endPointage(@Req() req, @Param('taskId') taskId: number) {
    return this.pointagesService.endPointage(req.user, taskId);
  }  
}