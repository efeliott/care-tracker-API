import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/user.model/user.model';
import { AuthDto } from './dto/auth.dto/auth.dto';
import { LoginDto } from './dto/auth.dto/login.dto';
import { CreationAttributes } from 'sequelize';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly jwtService: JwtService
  ) {}

  async register(authDto: AuthDto): Promise<{ token: string }> {
    const { nom, prenom, email, mot_de_passe, role, etablissement_id } = authDto;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await this.userModel.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Cet email est déjà utilisé.');
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

    // Créer un nouvel utilisateur
    const user = await this.userModel.create({
      nom,
      prenom,
      email,
      mot_de_passe: hashedPassword,
      role,
      etablissement_id: etablissement_id ?? null,
    } as CreationAttributes<User>);

    if (!user.id) {
      throw new Error('Erreur lors de la création de l’utilisateur, ID non généré.');
    }

    // Générer un token JWT
    const token = this.generateJwtToken(user);
    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, mot_de_passe } = loginDto;
    const user = await this.userModel.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(mot_de_passe, user.mot_de_passe))) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    // Générer un token JWT
    const token = this.generateJwtToken(user);
    return { token };
  }

  private generateJwtToken(user: User): string {
    return this.jwtService.sign({ id: user.id!, role: user.role });
  }
}