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
    codigoTipificacion: {
      type: Sequelize.STRING,
      allowNull: false
    },
    observacion: {
      type: Sequelize.STRING      
    }    
  }, {});
  GestionTelefono.associate = function (models) {
    GestionTelefono.belongsTo(models.telefonos, {
      foreignKey: 'idtelefono',
      target_id: 'idtelefono',
      as: 'telefono'
  });
  };
  return GestionTelefono;
};