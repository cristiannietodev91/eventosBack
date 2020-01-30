'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Telefono = sequelize.define('telefonos', {
    idtelefono: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    IdentificacionContacto: {
      type: Sequelize.STRING,
      allowNull: false
    },
    DescripcionTelefono: {
      type: Sequelize.STRING
    },
    NumTelefono: {
      type: Sequelize.STRING,
      allowNull: false
    }    
  }, {});
  Telefono.associate = function (models) {
    Telefono.hasMany(models.gestiontelefono, {
      foreignKey: 'idtelefono',
      as: 'telefonos'
    });
  };
  return Telefono;
};