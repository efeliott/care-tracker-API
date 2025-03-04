import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { RoleGuard } from '../auth/roles/roles.guard';
import { Permissions } from '../auth/decorators/roles.decorator/roles.decorator';
import { CreateTaskDto } from './dto/create-task.dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UseGuards(RoleGuard)
  @Permissions('tasks:create')
  createTask(@Req() req, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(req.user, createTaskDto);
  }

  @Get()
  @UseGuards(RoleGuard)
  @Permissions('tasks:read')
  getAllTasks(@Req() req) {
    return this.tasksService.getAllTasks(req.user);
  }
}