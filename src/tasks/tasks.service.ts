import { Injectable, ForbiddenException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreationAttributes } from 'sequelize';
import { Task } from './task.model/task.model';
import { User } from '../users/user.model/user.model';
import { CreateTaskDto } from './dto/create-task.dto/create-task.dto';
import { Op } from 'sequelize';

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
  
  // Récupérer toutes les tâches en fonction du rôle de l'utilisateur
  async getAllTasks(user: User): Promise<Task[]> {
    if (user.role === 'admin') {
      return this.taskModel.findAll();
    }
    if (user.role === 'agent') {
      return this.taskModel.findAll({ where: { agent_id: user.id } });
    }
    return this.taskModel.findAll({ where: { usager_id: user.id } });
  }

  // Récupérer une tâche en fonction de son ID et du rôle de l'utilisateur
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

  // Récupérer toutes les tâches pour les 7 prochains jours en fonction du rôle de l'utilisateur
  async getTasksForNext7Days(user: User): Promise<Task[]> {
    const today = new Date();
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(today.getDate() + 7);
  
    let whereCondition: any = {
      date: { [Op.between]: [today, sevenDaysLater] }
    };
  
    if (user.role === 'agent') {
      whereCondition.agent_id = user.id;
    } else if (user.role === 'usager') {
      whereCondition.usager_id = user.id;
    }
  
    const tasks = await this.taskModel.findAll({ where: whereCondition });
  
    if (tasks.length === 0) {
      return [];
    }
  
    return tasks;
  }
  
  // Récupérer toutes les tâches pour un utilisateur en fonction de son rôle
  async getAllTasksForUser(user: User): Promise<Task[]> {
    let whereCondition: any = {};
  
    if (user.role === 'agent') {
      whereCondition.agent_id = user.id;
    } else if (user.role === 'usager') {
      whereCondition.usager_id = user.id;
    }
  
    return this.taskModel.findAll({ where: whereCondition });
  }

  // Mettre à jour une tâche en fonction de son ID et du rôle de l'utilisateur
  async updateTask(user: User, taskId: number, updateData: Partial<Task>): Promise<Task> {
    const task = await this.taskModel.findByPk(taskId);
  
    if (!task) {
      throw new NotFoundException("La tâche spécifiée n'existe pas.");
    }
  
    // Vérification des permissions
    if (user.role === 'agent' && task.agent_id !== user.id) {
      throw new ForbiddenException("Un agent ne peut modifier que ses propres tâches.");
    }
    if (user.role === 'usager') {
      throw new ForbiddenException("Un usager ne peut pas modifier de tâches.");
    }
  
    // Mise à jour des champs autorisés uniquement
    const allowedFields: (keyof Task)[] = ['date', 'heure_debut', 'heure_fin', 'type_intervention', 'statut', 'remarques'];
    const updatePayload: Partial<Task> = {};
  
    for (const field of allowedFields) {
      if (updateData[field] !== undefined) {
        updatePayload[field] = updateData[field];
      }
    }
  
    if (Object.keys(updatePayload).length === 0) {
      throw new BadRequestException("Aucune donnée valide à mettre à jour.");
    }
  
    await this.taskModel.update(updatePayload, { where: { id: taskId } });
  
    // Recharger la tâche après mise à jour
    const updatedTask = await this.taskModel.findByPk(taskId);
  
    return updatedTask!;
  }
}