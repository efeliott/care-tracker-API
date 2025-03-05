import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model/user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  // Méthode pour trouver un utilisateur par son ID
  async findOneById(id: number): Promise<Partial<User> | null> {
    const user = await this.userModel.findOne({
        where: { id },
        attributes: [
            'id',
            'nom',
            'prenom',
            'email',
            'role',
            'tel',
            'naissance',
            'num_voie',
            'type_voie',
            'nom_voie',
            'ville',
            'code_postal'
        ]
    });

    return user ? user.toJSON() : null;
  }
  
  // Méthode pour mettre à jour le profil d'un utilisateur
  async updateProfile(userId: number, updateData: Partial<User>): Promise<Partial<User>> {
    // Vérifier si l'utilisateur existe
    const user = await this.userModel.findByPk(userId);
    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'ID ${userId} non trouvé.`);
    }

    // Mise à jour des champs autorisés
    const allowedFields: (keyof User)[] = ['nom', 'prenom', 'naissance', 'tel', 'num_voie', 'type_voie', 'nom_voie', 'ville', 'code_postal'];
    const updatePayload: Partial<User> = {};

    for (const field of allowedFields) {
      if (updateData[field] !== undefined) {
        updatePayload[field] = updateData[field] === '' ? null : updateData[field];
      }
    }

    if (Object.keys(updatePayload).length === 0) {
      throw new BadRequestException("Aucune donnée valide à mettre à jour.");
    }

    await this.userModel.update(updatePayload, { where: { id: userId } });

    // Retourner l'utilisateur mis à jour
    const updatedUser = await this.userModel.findByPk(userId, {
      attributes: ['id', 'nom', 'prenom', 'email', 'naissance', 'tel', 'num_voie', 'type_voie', 'nom_voie', 'ville', 'code_postal']
    });

    if (!updatedUser) {
      throw new NotFoundException(`Utilisateur avec l'ID ${userId} non trouvé après la mise à jour.`);
    }

    return updatedUser;
  }
}