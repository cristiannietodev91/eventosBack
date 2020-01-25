'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const GestionTelefono = sequelize.define('gestiontelefono', {
    idgestiontelefono: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    idtelefono: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    idtipificaciontel: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    observacion: {
      type: Sequelize.STRING      
    }    
  }, {});
  GestionTelefono.associate = function (models) {
    
  };
  return GestionTelefono;
};