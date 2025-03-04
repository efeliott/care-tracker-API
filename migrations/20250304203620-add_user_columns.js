'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'naissance', {
      type: Sequelize.DATE,
      allowNull: true,
    });

    await queryInterface.addColumn('Users', 'tel', {
      type: Sequelize.STRING(20),
      allowNull: true,
    });

    await queryInterface.addColumn('Users', 'num_voie', {
      type: Sequelize.STRING(10),
      allowNull: true,
    });

    await queryInterface.addColumn('Users', 'type_voie', {
      type: Sequelize.STRING(50),
      allowNull: true,
    });

    await queryInterface.addColumn('Users', 'nom_voie', {
      type: Sequelize.STRING(255),
      allowNull: true,
    });

    await queryInterface.addColumn('Users', 'ville', {
      type: Sequelize.STRING(100),
      allowNull: true,
    });

    await queryInterface.addColumn('Users', 'code_postal', {
      type: Sequelize.STRING(10),
      allowNull: true,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('Users', 'naissance');
    await queryInterface.removeColumn('Users', 'tel');
    await queryInterface.removeColumn('Users', 'num_voie');
    await queryInterface.removeColumn('Users', 'type_voie');
    await queryInterface.removeColumn('Users', 'nom_voie');
    await queryInterface.removeColumn('Users', 'ville');
    await queryInterface.removeColumn('Users', 'code_postal');
  }
};