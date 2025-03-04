import { IsNotEmpty, IsOptional, IsInt, IsDateString, IsBoolean } from 'class-validator';

export class CreatePlanningDto {
  @IsOptional()
  @IsInt()
  agent_id?: number;

  @IsOptional()
  @IsInt()
  usager_id?: number;

  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsBoolean()
  @IsNotEmpty()
  statut_validation: boolean;
}