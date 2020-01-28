'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const GestionCuenta = sequelize.define('gestioncuenta', {
    idgestioncuenta: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Identificacion: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    codigoTipificacion: {
      type: Sequelize.STRING,
      allowNull: false
    },
    observacion: {
      type: Sequelize.STRING      
    }    
  }, {});
  GestionCuenta.associate = function (models) {
    
  };
  return GestionCuenta;
};