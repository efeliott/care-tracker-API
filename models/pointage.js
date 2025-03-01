'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pointage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pointage.init({
    tache_id: DataTypes.INTEGER,
    agent_id: DataTypes.INTEGER,
    debut_pointage: DataTypes.DATE,
    fin_pointage: DataTypes.DATE,
    methode: DataTypes.ENUM
  }, {
    sequelize,
    modelName: 'Pointage',
  });
  return Pointage;
};