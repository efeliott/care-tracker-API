'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Taches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      usager_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Usagers',
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
        onDelete: 'CASCADE' // Mettre en CASCADE pour éviter NULL
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      heure_debut: {
        type: Sequelize.TIME,
        allowNull: false
      },
      heure_fin: {
        type: Sequelize.TIME,
        allowNull: false
      },
      type_intervention: {
        type: Sequelize.STRING,
        allowNull: false
      },
      statut: {
        type: Sequelize.ENUM('planifié', 'en cours', 'terminé', 'annulé'),
        allowNull: false
      },
      remarques: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      planning_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Plannings',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE' // Même chose ici
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
    await queryInterface.dropTable('Taches');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS \"enum_Taches_statut\"'); // Supprime l'ENUM au rollback
  }
};