'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('Users', {
    id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      hash: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      salt: {
        allowNull: false,
        type: Sequelize.STRING(1000)
      },
      firstname: {
        allowNull: true,
        type: Sequelize.STRING  
      },
      lastname: {
        type: Sequelize.STRING  
      },
      country: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING  
      },
      emailprivacy: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        default: '1'  //'0': Share with others, '1': Dont share with others
      },
      isemailverified: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
        defaultValue: '0'
      },
      emailverificationdate: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Date.now()        
      },
      phonenumber: {
        allowNull: true,
        type: Sequelize.STRING  
      },
      phonenumberprivacy: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
        default: '1'  //'0': Share with others, '1': Dont share with others
      },
      isphonenumberverified: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
        defaultValue: '0'
      },
      phonenumberverificationdate: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Date.now()        
      },
      whatsappnumber: {
        allowNull: true,
        type: Sequelize.STRING  
      },
      whatsappnumberprivacy: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
        default: '1'  //'0': Share with others, '1': Dont share with others
      },
      iswhatsappnumberverified: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
        defaultValue: '0'
      },
      whatsappnumberverificationdate: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Date.now()        
      },
      connectionprivacy: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        default: '1'  //'0': Public account, '1': Private account
      },
      birthdate: {
        type: Sequelize.DATE        
      },
      gender: {
        type: Sequelize.ENUM("male", "female"),
      },
      occupation: {
        type: Sequelize.STRING,
      },
      photo: {
        type: Sequelize.BLOB,
      },
      islearner: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isguide: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      bio: {
          type: Sequelize.TEXT
      },
      iscolearner: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      availabilitystatus: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: '1' //'0': Unavailable, '1': Available for Connection Requests
      },
      userstatus: {
        type: Sequelize.TINYINT,
        allowNull: true,
        defaultValue: '1' //'1': Active, '2': Temporarily deactivated, '2': Temporarily deleted
      },
      istermsandconditionschecked: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: '0'
      },
      registrationdate: {
        allowNull: true,
        type: Sequelize.DATE        
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
  }).then(function() {
    queryInterface.createTable('UserSkills', {
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
        skillId: {
            type: Sequelize.INTEGER,
            references: { model: 'Skills', key: 'id' }
        },
        skillType: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: '1' //'1': Skill to Learn, '2': Skill to Mentor,
        },
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        },
    }).then(function() {
        queryInterface.createTable('UserLanguages', {
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
            skillId: {
                type: Sequelize.INTEGER,
                references: { model: 'Languages', key: 'id' }
            },
            createdAt: {
              type: Sequelize.DATE
            },
            updatedAt: {
              type: Sequelize.DATE
            },
        })
  });
});
},
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('UserSkills').then(
            function() {
                return queryInterface.dropTable('UserLanguages').then(
                   function() {
                    return queryInterface.dropTable('Users');
                   } 
                )
            }
        );
  }
};


