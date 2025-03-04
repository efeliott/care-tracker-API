import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreationAttributes } from 'sequelize';
import { Task } from './task.model/task.model';
import { User } from '../users/user.model/user.model';
import { CreateTaskDto } from './dto/create-task.dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task) private readonly taskModel: typeof Task) {}

  async createTask(user: User, createTaskDto: CreateTaskDto): Promise<Task> {
    const { planning_id, agent_id, usager_id, type_intervention, remarques, date, heure_debut, heure_fin, statut } = createTaskDto;
  
    // Vérifier que l'agent cible existe bien et qu'il est "agent"
    if (agent_id) {
      const agent = await User.findOne({ where: { id: agent_id, role: 'agent' } });
      if (!agent) {
        throw new ForbiddenException("L'agent spécifié n'existe pas ou n'a pas le rôle approprié.");
      }
    }
  
    // Vérifier les permissions de création de tâche
    if (user.role === 'agent') {
      if (agent_id !== user.id) {
        throw new ForbiddenException("Un agent ne peut créer que ses propres tâches.");
      }
    }
  
    if (user.role === 'usager') {
      throw new ForbiddenException("Un usager ne peut pas créer de tâches.");
    }
  
    // Création de la tâche avec vérification des champs
    return await this.taskModel.create({
      planning_id,
      agent_id: agent_id ?? null, 
      usager_id: usager_id ?? null, 
      type_intervention,
      remarques: remarques ?? null,
      date: new Date(date),
      heure_debut,
      heure_fin,
      statut: statut as 'planifié' | 'en cours' | 'terminé' | 'annulé',
    } as CreationAttributes<Task>);
  }
  

  async getAllTasks(user: User): Promise<Task[]> {
    if (user.role === 'admin') {
      return this.taskModel.findAll();
    }
    if (user.role === 'agent') {
      return this.taskModel.findAll({ where: { agent_id: user.id } });
    }
    return this.taskModel.findAll({ where: { usager_id: user.id } });
  }

  async getTaskById(user: User, id: number): Promise<Task> {
    const task = await this.taskModel.findByPk(id);
    if (!task) {
      throw new ForbiddenException("La tâche spécifiée n'existe pas.");
    }
    if (user.role === 'agent' && task.agent_id !== user.id) {
      throw new ForbiddenException("Un agent ne peut consulter que ses propres tâches.");
    }
    if (user.role === 'usager' && task.usager_id !== user.id) {
      throw new ForbiddenException("Un usager ne peut consulter que ses propres tâches.");
    }
    return task;
  }
}