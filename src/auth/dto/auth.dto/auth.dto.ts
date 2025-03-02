import { IsEmail, IsNotEmpty, MinLength, IsEnum, IsOptional } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  nom: string;

  @IsNotEmpty()
  prenom: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  mot_de_passe: string;

  @IsEnum(['admin', 'agent', 'usager'])
  role: string;

  @IsOptional()
  etablissement_id?: number;
}