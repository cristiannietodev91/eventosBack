'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('Usuarios', {
    IdUsuario: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING
      // allowNull defaults to true
    },
    identificacion: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
      // allowNull defaults to true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    celular: {
      type: Sequelize.STRING,
      allowNull: false
    },
    tipoUsuario: {
      type: Sequelize.ENUM('Cliente', 'AdminTaller'),
      allowNull: false
    },
    estado: {
      type: Sequelize.ENUM('Registrado', 'Pendiente'),
      allowNull: false
    }
  }, {});
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Vehiculo, {
      foreignKey: 'IdUsuario',
      as: 'vehiculos',
      onDelete: 'CASCADE',
    });
  };
  return User;
};