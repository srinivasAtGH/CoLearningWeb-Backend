'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('Languages', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true
        },
        name: {
            allowNull: false,
            type: Sequelize.STRING
        },
      })
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Languages');
      }
    };
