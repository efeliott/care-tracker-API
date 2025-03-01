'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AgentEtablissement extends Model {
    static associate(models) {
      AgentEtablissement.belongsTo(models.User, { foreignKey: 'agent_id' });
      AgentEtablissement.belongsTo(models.Etablissement, { foreignKey: 'etablissement_id' });
    }
  }

  AgentEtablissement.init({
    agent_id: DataTypes.INTEGER,
    etablissement_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AgentEtablissement',
  });

  return AgentEtablissement;
};