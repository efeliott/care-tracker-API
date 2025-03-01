'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Statistique extends Model {
    static associate(models) {
      Statistique.belongsTo(models.User, { foreignKey: 'agent_id' });
      Statistique.belongsTo(models.Usager, { foreignKey: 'usager_id' });
    }
  }

  Statistique.init({
    agent_id: DataTypes.INTEGER,
    usager_id: DataTypes.INTEGER,
    total_heures: DataTypes.FLOAT,
    nb_interventions: DataTypes.INTEGER,
    methode_pointage_preferee: DataTypes.ENUM('manuel', 'NFC')
  }, {
    sequelize,
    modelName: 'Statistique',
  });

  return Statistique;
};