'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Contacts = sequelize.define('contacts', {
    IdContacts: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    FirstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    LastName: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true
      }
    },
    PhoneMobile: {
      type: Sequelize.STRING
    },
    PhoneHome: {
      type: Sequelize.STRING
    },
    PhoneBusiness: {
      type: Sequelize.STRING
    },
    PhoneBusiness2: {
      type: Sequelize.STRING
    },
    ContactUrl: {
      type: Sequelize.STRING
    },
    CompanyName: {
      type: Sequelize.STRING      
    },    
    Identificacion: {
      type: Sequelize.STRING      
    },
    Ciudad: {
      type: Sequelize.STRING      
    },
    Departamento: {
      type: Sequelize.STRING      
    }    
  }, {});
  Contacts.associate = function (models) {
    
  };
  return Contacts;
};