'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Usagers', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    });

    await queryInterface.changeColumn('Usagers', 'contact_urgence_id', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Usagers', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    });

    await queryInterface.changeColumn('Usagers', 'contact_urgence_id', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
  }
};