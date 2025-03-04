import { Table, Column, Model, DataType, ForeignKey, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { Task } from '../../tasks/task.model/task.model';
import { User } from '../../users/user.model/user.model';

@Table({ tableName: 'Pointages' })
export class Pointage extends Model<Pointage> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number; 

  @ForeignKey(() => Task)
  @Column({ type: DataType.INTEGER, allowNull: false })
  tache_id!: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  agent_id!: number;

  @Column({ type: DataType.DATE, allowNull: true })
  debut_pointage!: Date | null;

  @Column({ type: DataType.DATE, allowNull: true })
  fin_pointage!: Date | null;

  @Column({ type: DataType.ENUM('manuel', 'NFC'), allowNull: false })
  methode!: 'manuel' | 'NFC';

  @CreatedAt
  @Column({ type: DataType.DATE })
  declare createdAt: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE })
  declare updatedAt: Date;
}