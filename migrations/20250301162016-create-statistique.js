'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Statistiques', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      agent_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      usager_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Usagers',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      total_heures: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
      },
      nb_interventions: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      methode_pointage_preferee: {
        type: Sequelize.ENUM('manuel', 'NFC'),
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Statistiques');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS \"enum_Statistiques_methode_pointage_preferee\"'); // Supprime l'ENUM en rollback
  }
};