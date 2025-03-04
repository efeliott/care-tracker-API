'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Etablissement, { foreignKey: 'etablissement_id' });
      User.hasMany(models.Planning, { foreignKey: 'agent_id' });
      User.hasMany(models.Tache, { foreignKey: 'agent_id' });
      User.hasMany(models.Pointage, { foreignKey: 'agent_id' });
      User.hasMany(models.Statistique, { foreignKey: 'agent_id' });
      User.hasMany(models.AgentEtablissement, { foreignKey: 'agent_id' });
    }
  }

  User.init({
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.ENUM('admin', 'agent', 'usager'),
    etablissement_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};