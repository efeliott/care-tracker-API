import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException, Inject, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLE_PERMISSIONS } from '../permissions';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class RoleGuard implements CanActivate {
  private readonly logger = new Logger(RoleGuard.name);

  constructor(
    private reflector: Reflector,
    @Inject(JwtService) private jwtService: JwtService,
  ) {
    this.logger.log(`🚀 JwtService injecté: ${!!this.jwtService}`);
  }

  canActivate(context: ExecutionContext): boolean {
    this.logger.log('🚀 RoleGuard exécuté');

    const requiredPermissions = this.reflector.get<string[]>('permissions', context.getHandler());
    if (!requiredPermissions) {
      this.logger.log('🔓 Aucune permission requise, accès autorisé.');
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      this.logger.error('Accès refusé : Aucun token fourni.');
      throw new UnauthorizedException('Accès refusé : aucun token fourni.');
    }

    const token = authHeader.replace('Bearer ', '');
    this.logger.log(`🔑 Token reçu : ${token}`);

    let user;

    try {
      this.logger.log(`🔍 RoleGuard - SECRET utilisé : ${process.env.JWT_SECRET}`);
      user = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      this.logger.log(`Utilisateur identifié : ${JSON.stringify(user)}`);
    } catch (error) {
      this.logger.error(`Erreur lors de la vérification du token : ${error.message}`);
      throw new UnauthorizedException('Token invalide.');
    }

    // 🔍 Vérifier les permissions
    const userPermissions = ROLE_PERMISSIONS[user.role] || [];
    this.logger.log(`Permissions actuelles de ${user.email} (${user.role}) : ${JSON.stringify(userPermissions)}`);
    this.logger.log(`Permissions requises : ${JSON.stringify(requiredPermissions)}`);

    const hasPermission = requiredPermissions.some((permission) => userPermissions.includes(permission));

    if (!hasPermission) {
      this.logger.warn(`Accès interdit pour ${user.email} (${user.role}). Permissions requises: ${requiredPermissions}. Permissions actuelles: ${userPermissions}`);
      throw new ForbiddenException('Accès interdit : permissions insuffisantes.');
    }

    this.logger.log(`Accès accordé à ${user.email} (${user.role}).`);
    request.user = user;
    return true;
  }
}