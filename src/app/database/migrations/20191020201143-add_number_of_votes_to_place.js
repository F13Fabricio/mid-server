'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'places',
      'number_of_votes',
      {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER,
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'places',
      'number_of_votes'
    );
  }
};
