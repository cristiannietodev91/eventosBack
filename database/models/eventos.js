'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Evento = sequelize.define('evento', {
    idevento: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombrevento: {
      type: Sequelize.STRING(150),
      allowNull: false
    },
    fechaevento: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    contactoevento: {
      type: Sequelize.STRING(100)
    },
    urlcontacto: {
      type: Sequelize.STRING(300)
    },
    companyname: {
      type: Sequelize.STRING (80)     
    },
    ciudad: {
      type: Sequelize.STRING     
    },
    departamento: {
      type: Sequelize.STRING      
    }    
  }, {});
  Evento.associate = function (models) {
    
  };
  return Evento;
};