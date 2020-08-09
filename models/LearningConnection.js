"use strict";
module.exports = (sequelize, DataTypes) => {
    var LearningConnection = sequelize.define("LearningConnection", {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        references: { model: 'Users', key: 'id' }
    },
    partnerId: {
        type: DataTypes.INTEGER,
        references: { model: 'Users', key: 'id' }
    },
    skillId: {
        type: DataTypes.INTEGER,
        references: { model: 'UserSkills', key: 'id' }
    },
    skillFluency: {
        type: DataTypes.TINYINT,
    },
    timeCommitment: {
        type: DataTypes.STRING,
    },
    personalNoteRequest: {
        type: DataTypes.TEXT,
    },
    dateOfRequest: {
        type: DataTypes.DATE,
    },
    connectionStatus: {
        //type: DataTypes.TINYINT, //0 - Pending, 1 - Accepted, 2 - Rejected
        type: DataTypes.ENUM("pending", "accepted", "rejected"),
    },
    acceptanceRejectionDate: {
        type: DataTypes.DATE,
    },
    personalNoteResponse: {
        type: DataTypes.TEXT,
    },
    actionUserId: {
        type: DataTypes.INTEGER,
    },
    connectionType: {
        //type: DataTypes.TINYINT, //1-learner //2-co-learner
        type: DataTypes.ENUM("learner", "colearner"),
    },
});

LearningConnection.prototype.toJSON = function () {
    return {
        id: this.id,
        userId: this.userId,
        partnerId: this.partnerId,
        skillId: this.skillId,
        skillFluency: this.skillFluency,
        timeCommitment: this.timeCommitment,
        personalNoteRequest: this.personalNoteRequest,
        dateOfRequest: this.dateOfRequest,
        connectionStatus: this.connectionStatus,
        acceptanceRejectionDate: this.acceptanceRejectionDate,
        personalNoteResponse: this.personalNoteResponse,
        actionUserId: this.actionUserId,
    };
  };

return LearningConnection;

}