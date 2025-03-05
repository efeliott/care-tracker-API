import { Injectable, ForbiddenException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Usager } from './usager.model/usager.model';
import { User } from '../users/user.model/user.model';
import { Planning } from '../plannings/planning.model/planning.model';
import { CreationAttributes } from 'sequelize';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsagersService {
  constructor(
    @InjectModel(Usager) private readonly usagerModel: typeof Usager,
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(Planning) private readonly planningModel: typeof Planning
  ) {}

  async createUsager(
    adminId: number,
    adminEtablissementId: number | null,
    usagerData: Partial<Usager & { nom: string; prenom: string; email: string; date_naissance: Date; tel: string }>
  ): Promise<Usager> {
    if (!adminId) {
      throw new ForbiddenException("Seuls les administrateurs peuvent créer un usager.");
    }

    console.log("Etablissement récupéré de l'admin:", adminEtablissementId);

    // Générer un mot de passe temporaire sécurisé
    const tempPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    // Vérifier si un utilisateur avec cet email existe déjà
    const existingUser = await this.userModel.findOne({ where: { email: usagerData.email } });
    if (existingUser) {
      throw new ConflictException("Un utilisateur avec cet email existe déjà.");
    }

    // Créer l'utilisateur associé avec `etablissement_id` de l'admin
    const user = await this.userModel.create({
      nom: usagerData.nom ?? '',
      prenom: usagerData.prenom ?? '',
      email: usagerData.email ?? '',
      password: hashedPassword,
      role: 'usager',
      etablissement_id: adminEtablissementId,
      naissance: usagerData.date_naissance ?? null,
      tel: usagerData.tel ?? null
    } as CreationAttributes<User>);

    // Créer l'usager lié à l'utilisateur
    const usager = await this.usagerModel.create({
      user_id: user.id,
      contact_urgence_id: usagerData.contact_urgence_id ?? null,
      badge_nfc: usagerData.badge_nfc ?? null,
      etablissement_id: adminEtablissementId
    } as CreationAttributes<Usager>);

    // Créer un planning lié à l'usager
    await this.planningModel.create({
      usager_id: usager.id,
      agent_id: null,
      date: new Date(),
      statut_validation: false
    } as CreationAttributes<Planning>);

    console.log(`Planning créé pour l'usager ID : ${usager.id}`);

    return usager;
  }

  // Récupérer l'usager par l'ID de l'utilisateur
  async getUsagerByUserId(userId: number): Promise<Usager | null> {
    return await this.usagerModel.findOne({
      where: { user_id: userId },
      include: [{ model: User, attributes: ['nom', 'prenom', 'email', 'naissance', 'tel'] }]
    });
  }
}