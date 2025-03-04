import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import User from '../users/user.model/user.model';
import { Planning } from '../plannings/planning.model/planning.model';
import { AuthDto } from './dto/auth.dto/auth.dto';
import { LoginDto } from './dto/auth.dto/login.dto';
import { CreationAttributes } from 'sequelize';

@Injectable()
export class AuthService {
  constructor(
    private readonly sequelize: Sequelize,
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(Planning) private readonly planningModel: typeof Planning,
    private readonly jwtService: JwtService
  ) {}

  async register(authDto: AuthDto): Promise<{ token: string }> {
    const { nom, prenom, email, password, role, etablissement_id, tel } = authDto;
  
    const existingUser = await this.userModel.findOne({ where: { email } });
    if (existingUser) throw new ConflictException('Cet email est déjà utilisé.');
  
    const hashedPassword = await bcrypt.hash(password, 10);
    const transaction = await this.sequelize.transaction();
  
    try {
      // Insérer l'utilisateur
      const user = await this.userModel.create(
        { 
          nom, 
          prenom, 
          email, 
          password: hashedPassword, 
          role, 
          etablissement_id: etablissement_id ?? null,
          tel: tel ?? null
        } as CreationAttributes<User>,
        { transaction }
      );
  
      console.log(`Utilisateur créé avec ID : ${user.id}`);
  
      // Recharger l'utilisateur pour s'assurer qu'il est bien en base
      await user.reload({ transaction });
  
      // Insérer un planning lié à l'utilisateur
      const planningData: Partial<Planning> = { 
        date: new Date(), 
        statut_validation: false
      };
  
      if (role === 'admin' || role === 'agent') {
        planningData.agent_id = user.id;
      } else if (role === 'usager') {
        planningData.usager_id = user.id;
      }
  
      await this.planningModel.create(planningData as CreationAttributes<Planning>, { transaction });
  
      console.log(`Planning créé pour l'utilisateur ID : ${user.id}`);
  
      // Commit la transaction après toutes les opérations
      await transaction.commit();
      return { token: this.generateJwtToken(user) };
  
    } catch (error) {
      await transaction.rollback();
      console.error('Erreur lors de l’inscription:', error);
      throw new Error('Une erreur est survenue lors de l’inscription.');
    }
  }
  

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ where: { email } });
  
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Identifiants invalides');
    }
  
    const token = this.generateJwtToken(user);
    return { token };
  }
  

  private generateJwtToken(user: User): string {
    const payload = { sub: user.id, email: user.email, role: user.role, etablissement_id: user.etablissement_id };
    return this.jwtService.sign(payload);
  }
}