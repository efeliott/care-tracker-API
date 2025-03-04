import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { CreationOptional } from 'sequelize'; 

@Table({ tableName: 'Users' })
export class User extends Model<User> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: CreationOptional<number>; 

  @Column({ type: DataType.STRING, allowNull: false })
  declare nom: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare prenom: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare password: string;

  @Column({ type: DataType.ENUM('admin', 'agent', 'usager'), allowNull: false })
  declare role: string;

  @Column({ type: DataType.INTEGER, allowNull: true })
  declare etablissement_id: number | null;

  @Column({ type: DataType.DATE, allowNull: true })
  declare naissance: Date | null;

  @Column({ type: DataType.STRING(20), allowNull: true })
  declare tel: string | null;

  @Column({ type: DataType.STRING(10), allowNull: true })
  declare num_voie: string | null;

  @Column({ type: DataType.STRING(50), allowNull: true })
  declare type_voie: string | null;

  @Column({ type: DataType.STRING(255), allowNull: true })
  declare nom_voie: string | null;

  @Column({ type: DataType.STRING(100), allowNull: true })
  declare ville: string | null;

  @Column({ type: DataType.STRING(10), allowNull: true })
  declare code_postal: string | null;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
  declare createdAt: CreationOptional<Date>;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
  declare updatedAt: CreationOptional<Date>;
}

export default User;
