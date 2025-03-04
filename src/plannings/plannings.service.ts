import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Planning } from './planning.model/planning.model';
import { User } from '../users/user.model/user.model';
import { CreatePlanningDto } from './dto/create-planning.dto/create-planning.dto';

@Injectable()
export class PlanningsService {
  constructor(@InjectModel(Planning) private readonly planningModel: typeof Planning) {}

  async createPlanning(user: User, createPlanningDto: CreatePlanningDto): Promise<Planning> {
    const { agent_id, usager_id, date, statut_validation } = createPlanningDto;

    // Vérification des droits
    if (user.role === 'agent' && agent_id !== user.id) {
      throw new ForbiddenException("Un agent ne peut gérer que son propre planning.");
    }
    if (user.role === 'usager') {
      throw new ForbiddenException("Un usager ne peut pas créer de planning.");
    }

    return await this.planningModel.create({
      agent_id: agent_id ?? null,
      usager_id: usager_id ?? null,
      date: new Date(date),
      statut_validation: Boolean(statut_validation),
    } as Planning);
  }

  async getPlannings(user: User): Promise<Planning[]> {
    if (user.role === 'admin') {
      return this.planningModel.findAll();
    }
    if (user.role === 'agent') {
      return this.planningModel.findAll({ where: { agent_id: user.id } });
    }
    return this.planningModel.findAll({ where: { usager_id: user.id } });
  }
}