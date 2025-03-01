'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Etablissement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Etablissement.init({
    nom: DataTypes.STRING,
    adresse: DataTypes.STRING,
    telephone: DataTypes.STRING,
    email: DataTypes.STRING,
    type: DataTypes.ENUM
  }, {
    sequelize,
    modelName: 'Etablissement',
  });
  return Etablissement;
};