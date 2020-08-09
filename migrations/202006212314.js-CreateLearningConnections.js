'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('LearningConnections', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true
        },
        userId: {
            type: Sequelize.INTEGER,
            references: { model: 'Users', key: 'id' }
        },
        partnerId: {
            type: Sequelize.INTEGER,
            references: { model: 'Users', key: 'id' }
        },
        skillId: {
            type: Sequelize.INTEGER,
            references: { model: 'UserSkills', key: 'id' }
        },
        skillFluency: {
            type: Sequelize.TINYINT,
        },
        timeCommitment: {
            type: Sequelize.STRING,
        },
        personalNoteRequest: {
            type: Sequelize.TEXT,
        },
        dateOfRequest: {
            type: Sequelize.DATE,
        },
        connectionStatus: {
            type: DataTypes.ENUM("pending", "accepted", "rejected"),
        },
        acceptanceRejectionDate: {
            type: Sequelize.DATE,
        },
        personalNoteResponse: {
            type: Sequelize.TEXT,
        },
        actionUserId: {
            type: Sequelize.INTEGER,
        },
        connectionType: {
            type: DataTypes.ENUM("learner", "colearner"),
        },
        createdAt: {
            type: Sequelize.DATE
        },
        updatedAt: {
        type: Sequelize.DATE
        },
      })
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('LearningConnections');
      }
    };
