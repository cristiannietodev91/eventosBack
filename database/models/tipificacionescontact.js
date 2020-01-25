'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const TipificacionesContact = sequelize.define('tipificacionescontact', {
    idtipificacioncontact: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    arbol: {
      type: Sequelize.JSON,
      allowNull: false
    }    
  }, {});
  TipificacionesContact.associate = function (models) {
    
  };
  return TipificacionesContact;
};