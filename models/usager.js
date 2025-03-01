'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Usager extends Model {
    static associate(models) {
      Usager.belongsTo(models.Etablissement, { foreignKey: 'etablissement_id' });
      Usager.hasOne(models.DossierUsager, { foreignKey: 'usager_id' });
      Usager.hasMany(models.Contact, { foreignKey: 'usager_id' });
      Usager.hasMany(models.Tache, { foreignKey: 'usager_id' });
      Usager.hasMany(models.Planning, { foreignKey: 'usager_id' });
      Usager.hasMany(models.Statistique, { foreignKey: 'usager_id' });
    }
  }

  Usager.init({
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    date_naissance: DataTypes.DATE,
    contact_urgence_id: DataTypes.INTEGER,
    adresse: DataTypes.STRING,
    badge_nfc: DataTypes.STRING,
    etablissement_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Usager',
  });

  return Usager;
};