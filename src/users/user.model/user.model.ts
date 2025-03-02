import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { CreationOptional } from 'sequelize'; // Ajout de `CreationOptional`

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: CreationOptional<number>; // Ajout de `CreationOptional`

  @Column({ type: DataType.STRING, allowNull: false })
  declare nom: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare prenom: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare mot_de_passe: string;

  @Column({ type: DataType.ENUM('admin', 'agent', 'usager'), allowNull: false })
  declare role: string;

  @Column({ type: DataType.INTEGER, allowNull: true })
  declare etablissement_id: number | null;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
  declare createdAt: CreationOptional<Date>;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
  declare updatedAt: CreationOptional<Date>;
}

export default User;