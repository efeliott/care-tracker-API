import { IsNotEmpty, IsOptional, IsEnum, IsInt, IsDateString } from 'class-validator';

export class CreateTaskDto {
  @IsInt()
  @IsNotEmpty()
  planning_id: number;

  @IsInt()
  @IsOptional()
  agent_id?: number;

  @IsInt()
  @IsOptional()
  usager_id?: number;

  @IsNotEmpty()
  type_intervention: string;

  @IsOptional()
  remarques?: string;

  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsNotEmpty()
  heure_debut: string;

  @IsNotEmpty()
  heure_fin: string;

  @IsEnum(['planifié', 'en cours', 'terminé', 'annulé'])
  @IsNotEmpty()
  statut: 'planifié' | 'en cours' | 'terminé' | 'annulé';
}