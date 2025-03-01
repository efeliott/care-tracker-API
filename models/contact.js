'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    static associate(models) {
      Contact.belongsTo(models.Usager, { foreignKey: 'usager_id' });
    }
  }

  Contact.init({
    nom: DataTypes.STRING,
    telephone: DataTypes.STRING,
    relation: DataTypes.STRING,
    usager_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Contact',
  });

  return Contact;
};