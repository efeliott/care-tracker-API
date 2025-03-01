'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DossierUsagers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      usager_id: {
        type: Sequelize.INTEGER
      },
      historique_interventions: {
        type: Sequelize.TEXT
      },
      instructions_specifiques: {
        type: Sequelize.TEXT
      },
      etat_sante: {
        type: Sequelize.TEXT
      },
      notes_agents: {
        type: Sequelize.TEXT
      },
      date_maj: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DossierUsagers');
  }
};