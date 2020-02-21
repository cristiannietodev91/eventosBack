'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const boleto = sequelize.define('boleto', {
    idboleto: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    idevento: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    tipoboleto: {
      type: Sequelize.STRING,
      allowNull: false
    },
    observacion: {
      type: Sequelize.STRING      
    },
    uid: {
      type: Sequelize.STRING      
    }    
  }, {});
  boleto.associate = function (models) {
    boleto.belongsTo(models.evento, {
      foreignKey: 'idevento',
      target_id: 'idevento',
      as: 'evento'
  });
  };
  return boleto;
};