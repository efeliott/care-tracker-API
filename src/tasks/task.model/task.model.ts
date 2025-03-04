import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../../users/user.model/user.model';
import { Planning } from '../../plannings/planning.model/planning.model';

@Table({ tableName: 'Taches' })
export class Task extends Model<Task> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ForeignKey(() => Planning)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare planning_id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare agent_id: number | null;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare usager_id: number | null;

  @Column({ type: DataType.DATE, allowNull: false })
  declare date: Date;

  @Column({ type: DataType.TIME, allowNull: false })
  declare heure_debut: string;

  @Column({ type: DataType.TIME, allowNull: false })
  declare heure_fin: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare type_intervention: string;

  @Column({ type: DataType.ENUM('planifié', 'en cours', 'terminé', 'annulé'), allowNull: false })
  declare statut: 'planifié' | 'en cours' | 'terminé' | 'annulé';

  @Column({ type: DataType.TEXT, allowNull: true })
  declare remarques: string;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
  declare createdAt: Date;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
  declare updatedAt: Date;
}