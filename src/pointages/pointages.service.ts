import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Pointage } from './pointage.model/pointage.model';
import { CreationAttributes, Op, literal } from 'sequelize';
import { Task } from '../tasks/task.model/task.model';
import { User } from '../users/user.model/user.model';


@Injectable()
export class PointagesService {
  constructor(
    @InjectModel(Pointage) private readonly pointageModel: typeof Pointage,
    @InjectModel(Task) private readonly taskModel: typeof Task
  ) {}

  async startPointage(user: User, taskId: number, methode: 'manuel' | 'NFC') {
    console.log('USER IN SERVICE:', user);
  
    if (!user || !user.id) {
      throw new ForbiddenException('Utilisateur non authentifié.');
    }
  
    if (user.role !== 'admin' && user.role !== 'agent') {
      throw new ForbiddenException('Seuls les agents et les administrateurs peuvent pointer une tâche.');
    }
  
    const task = await this.taskModel.findByPk(taskId);
    if (!task) {
      throw new NotFoundException("La tâche spécifiée n'existe pas.");
    }
    if (task.statut !== 'planifié') {
      throw new ForbiddenException("Seules les tâches planifiées peuvent être pointées.");
    }
  
    await this.pointageModel.create({
      tache_id: taskId,
      agent_id: user.id,
      debut_pointage: new Date(),
      methode
    } as CreationAttributes<Pointage>);
  
    task.statut = 'en cours';
    await task.save();
  
    return { message: 'Pointage démarré avec succès.', task };
  }
  
  async endPointage(user: User, taskId: number) {
    console.log('USER IN SERVICE:', user);
  
    if (!user || !user.id) {
      throw new ForbiddenException('Utilisateur non authentifié.');
    }
  
    if (user.role !== 'admin' && user.role !== 'agent') {
      throw new ForbiddenException('Seuls les agents et les administrateurs peuvent terminer un pointage.');
    }
  
    // Vérifier si la tâche existe et est bien "en cours"
    const task = await this.taskModel.findByPk(taskId);
    if (!task) {
      throw new NotFoundException("La tâche spécifiée n'existe pas.");
    }
    if (task.statut !== 'en cours') {
      throw new ForbiddenException("Seules les tâches en cours peuvent être clôturées.");
    }
  
    // Recherche du pointage en cours
    const pointage = await this.pointageModel.findOne({
        where: { tache_id: taskId, agent_id: user.id, fin_pointage: { [Op.is]: literal('NULL') } },
        order: [['createdAt', 'DESC']]
    });
  
    if (!pointage) {
      throw new NotFoundException("Aucun pointage en cours trouvé pour cette tâche.");
    }
  
    // Utiliser update() à la place de save()
    await this.pointageModel.update(
      { fin_pointage: new Date(), updatedAt: new Date() }, // Ajout explicite de updatedAt
      { where: { id: pointage.id } }
    );
  
    // Recharge l'objet depuis la base après update
    const updatedPointage = await this.pointageModel.findByPk(pointage.id);
  
    console.log('POINTAGE MIS À JOUR:', updatedPointage?.toJSON());
  
    // Mise à jour du statut de la tâche
    task.statut = 'terminé';
    await task.save();
  
    return { message: 'Pointage terminé avec succès.', pointage: updatedPointage, task };
  }
}