'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const TipificacionesTel = sequelize.define('tipificaciontel', {
    idtipificaciontel: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    arbol: {
      type: Sequelize.JSON,
      allowNull: false
    }    
  }, {});
  TipificacionesTel.associate = function (models) {
    
  };
  return TipificacionesTel;
};