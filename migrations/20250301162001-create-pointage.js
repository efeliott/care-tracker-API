'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pointages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tache_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Taches',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      agent_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE' // Correction ici pour éviter les conflits de NULL
      },
      debut_pointage: {
        type: Sequelize.DATE,
        allowNull: false
      },
      fin_pointage: {
        type: Sequelize.DATE,
        allowNull: true
      },
      methode: {
        type: Sequelize.ENUM('manuel', 'NFC'),
        allowNull: false
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
    await queryInterface.dropTable('Pointages');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS \"enum_Pointages_methode\"'); // Supprime l'ENUM en rollback
  }
};