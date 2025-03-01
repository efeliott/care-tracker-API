'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DossierUsager extends Model {
    static associate(models) {
      DossierUsager.belongsTo(models.Usager, { foreignKey: 'usager_id' });
    }
  }

  DossierUsager.init({
    usager_id: DataTypes.INTEGER,
    historique_interventions: DataTypes.TEXT,
    instructions_specifiques: DataTypes.TEXT,
    etat_sante: DataTypes.TEXT,
    notes_agents: DataTypes.TEXT,
    date_maj: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'DossierUsager',
  });

  return DossierUsager;
};