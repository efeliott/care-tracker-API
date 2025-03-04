import { Table, Column, Model, DataType, ForeignKey, CreatedAt, UpdatedAt, Unique } from 'sequelize-typescript';
import { User } from '../../users/user.model/user.model';

@Table({ tableName: 'Usagers' })
export class Usager extends Model<Usager> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ForeignKey(() => User)
  @Unique
  @Column({ type: DataType.INTEGER, allowNull: false })
  user_id!: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: true })
  contact_urgence_id!: number | null;

  @Column({ type: DataType.STRING, allowNull: true, unique: true })
  badge_nfc!: string | null;

  @Column({ type: DataType.INTEGER, allowNull: true })
  etablissement_id!: number | null;

  @CreatedAt
  @Column({ type: DataType.DATE })
  declare createdAt: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE })
  declare updatedAt: Date;
}