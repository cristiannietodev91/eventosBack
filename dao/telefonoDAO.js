const models = require("../database/models");

module.exports = {
    findAll: function (cb) {
        // Find all users
        models.telefonos.findAll().then(telefonos => {
            cb(null, telefonos);
        });
    },
    create: function (telefono, cb) {
        // Find all users
        return models.sequelize.transaction((t1) => {
            return models.telefonos.create(telefono).then(telefono => {
                return telefono;
            });
        }).then(function (result) {
            if (result) {
                console.debug('Resultado despues de crear telefono :::: >', result);
                var telefonoCreated = result.dataValues;
                cb(null, telefonoCreated);
            } else {
                cb(null, null);
            }

        }).catch(function (err) {
            cb(err, null);
        });
    },
    update: function (idtelefono, telefono, cb) {
        // Find all users
        return models.sequelize.transaction((t1) => {
            return models.telefonos.update(telefono, {
                where: { idtelefono: idtelefono }
            }).then(telefono => {
                return telefono;
            });
        }).then(function (result) {
            if (result) {
                console.debug('Resultado despues de actualizar telefono :::: >', contacto);
                cb(null, result);
            } else {
                cb(null, null);
            }
        }).catch(function (err) {
            cb(err, null);
        });
    },
    getById: function (idtelefono, cb) {
        // Find all users
        return models.sequelize.transaction((t1) => {
            return models.telefonos.findByPk(idtelefono).then(telefono => {
                return telefono;
            });
        }).then(function (result) {
            if (result) {
                console.debug('Resultado despues getTelefono By Id :::: >', result);
                var telefono = result.dataValues;
                cb(null, telefono);
            } else {
                cb(null, null);
            }
        }).catch(function (err) {
            cb(err, null);
        });
    },
    deleteById: function (idtelefono, cb) {
        // Find all users
        return models.sequelize.transaction((t1) => {
            return models.telefonos.destroy({
                where: { idtelefono: idtelefono }
            }).then(deleted => {
                return deleted;
            });
        }).then(function (result) {
            console.log('Resultado despues Eliminar telefono :::: >', result);
            cb(null, result);
        }).catch(function (err) {
            cb(err, null);
        });
    }
}