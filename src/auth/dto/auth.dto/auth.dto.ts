import { IsEmail, IsNotEmpty, MinLength, IsEnum, IsOptional } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  nom: string;

  @IsNotEmpty()
  prenom: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsEnum(['admin', 'agent', 'usager'])
  role: string;

  @IsOptional()
  etablissement_id?: number;

  @IsOptional()
  naissance?: Date;

  @IsOptional()
  tel?: string;

  @IsOptional()
  num_voie?: string;

  @IsOptional()
  type_voie?: string;

  @IsOptional()
  nom_voie?: string;

  @IsOptional()
  ville?: string;

  @IsOptional()
  code_postal?: string;
}