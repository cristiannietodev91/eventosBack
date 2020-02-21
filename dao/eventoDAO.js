const models = require("../database/models");


module.exports = {
    findAll: function (cb) {
        // Find all users
        models.evento.findAll().then(eventos => {
            cb(null, eventos);
        });
    },
    create: function (evento, cb) {
        // Find all users
        return models.sequelize.transaction((t1) => {
            return models.evento.create(evento).then(evento => {
                return evento;
            });
        }).then(function (result) {
            if (result) {
                console.debug('Resultado despues de crear evento :::: >', result);
                var eventCreated = result.dataValues;
                cb(null, eventCreated);
            } else {
                cb(null, null);
            }

        }).catch(function (err) {
            cb(err, null);
        });
    },
    update: function (idevento, evento, cb) {
        // Find all users
        return models.sequelize.transaction((t1) => {
            return models.evento.update(evento, {
                where: { idevento: idevento }
            }).then(evento => {
                return evento;
            });
        }).then(function (result) {
            if (result) {
                console.debug('Resultado despues de actualizar evento :::: >', result);
                cb(null, result);
            } else {
                cb(null, null);
            }
        }).catch(function (err) {
            cb(err, null);
        });
    },
    getById: function (idevento, cb) {
        // Find all users
        return models.sequelize.transaction((t1) => {
            return models.evento.findByPk(idevento).then(evento => {
                return evento;
            });
        }).then(function (result) {
            if (result) {
                console.debug('Resultado despues getEvento By Id :::: >', result);
                var evento = result.dataValues;
                cb(null, evento);
            } else {
                cb(null, null);
            }
        }).catch(function (err) {
            cb(err, null);
        });
    },
    deleteById: function (idevento, cb) {
        // Find all users
        return models.sequelize.transaction((t1) => {
            return models.evento.destroy({
                where: { idevento: idevento }
            }).then(deleted => {
                return deleted;
            });
        }).then(function (result) {
            console.log('Resultado despues Eliminar evento :::: >', result);
            cb(null, result);
        }).catch(function (err) {
            cb(err, null);
        });
    },
    findOneByFilter: function (filter, cb) {
        return models.sequelize.transaction((t1) => {
            return models.evento.findOne({
                where: filter
            }).then(evento => {
                return evento;
            });
        }).then(function (result) {
            if (result) {
                //console.debug('Resultado despues listar vehiculos By Filter :::: >',filter,' Result ::::> ', result);                
                cb(null, result);
            } else {
                cb(null, null);
            }
        }).catch(function (err) {
            cb(err, null);
        });
    }
}