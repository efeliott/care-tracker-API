import { Controller, Get, Post, Put, Body, UseGuards, Req, Param } from '@nestjs/common';
import { Task } from './task.model/task.model';
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

  @Get('next7days')
  @UseGuards(RoleGuard)
  @Permissions('tasks:read')
  getTasksForNext7Days(@Req() req) {
    return this.tasksService.getTasksForNext7Days(req.user);
  }

  @Get('all')
  @UseGuards(RoleGuard)
  @Permissions('tasks:read')
  getAllTasksForUser(@Req() req) {
    return this.tasksService.getAllTasksForUser(req.user);
  }

  @Get()
  @UseGuards(RoleGuard)
  @Permissions('tasks:read')
  getAllTasks(@Req() req) {
    return this.tasksService.getAllTasks(req.user);
  }

  @Get(':id')
  @UseGuards(RoleGuard)
  @Permissions('tasks:read')
  getTaskById(@Req() req, @Param('id') id: number) {
    return this.tasksService.getTaskById(req.user, id);
  }

  @Put(':id')
  @UseGuards(RoleGuard)
  @Permissions('tasks:update')
  updateTask(@Req() req, @Param('id') taskId: number, @Body() updateData: Partial<Task>) {
    return this.tasksService.updateTask(req.user, taskId, updateData);
}
}