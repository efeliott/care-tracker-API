'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tache extends Model {
    static associate(models) {
      Tache.belongsTo(models.Usager, { foreignKey: 'usager_id' });
      Tache.belongsTo(models.User, { foreignKey: 'agent_id' });
      Tache.belongsTo(models.Planning, { foreignKey: 'planning_id' });
      Tache.hasMany(models.Pointage, { foreignKey: 'tache_id' });
    }
  }

  Tache.init({
    usager_id: DataTypes.INTEGER,
    agent_id: DataTypes.INTEGER,
    date: DataTypes.DATE,
    heure_debut: DataTypes.TIME,
    heure_fin: DataTypes.TIME,
    type_intervention: DataTypes.STRING,
    statut: DataTypes.ENUM('planifié', 'en cours', 'terminé', 'annulé'),
    remarques: DataTypes.TEXT,
    planning_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tache',
  });

  return Tache;
};