'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Planning extends Model {
    static associate(models) {
      Planning.belongsTo(models.User, { foreignKey: 'agent_id' });
      Planning.belongsTo(models.Usager, { foreignKey: 'usager_id' });
    }
  }

  Planning.init({
    agent_id: DataTypes.INTEGER,
    date: DataTypes.DATE,
    statut_validation: DataTypes.BOOLEAN,
    usager_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Planning',
  });

  return Planning;
};