const models = require("../database/models");

module.exports = {
    findAll: function (cb) {
        // Find all users
        models.gestiontelefono.findAll().then(gestiones => {
            cb(null, gestiones);
        });
    },
    findAllByFilter: function (filter,cb) {
        // Find all users
        models.gestiontelefono.findAll({
            include:
            {
                model: models.telefonos,
                as: 'telefono',
                where: filter,
            },
            order: [
                // Will escape title and validate DESC against a list of valid direction parameters
                ['idgestiontelefono', 'DESC']
            ]
        }).then(gestiones => {
            cb(null, gestiones);
        });
    },
    create: function (gestion, cb) {
        // Find all users
        return models.sequelize.transaction((t1) => {
            return models.gestiontelefono.create(gestion).then(gestion => {
                return gestion;
            });
        }).then(function (result) {
            if (result) {
                console.debug('Resultado despues de crear telefono :::: >', result);
                var gestionCreated = result.dataValues;
                cb(null, gestionCreated);
            } else {
                cb(null, null);
            }

        }).catch(function (err) {
            cb(err, null);
        });
    },
    getById: function (idgestion, cb) {
        // Find all users
        return models.sequelize.transaction((t1) => {
            return models.gestiontelefono.findByPk(idgestion).then(gestion => {
                return gestion;
            });
        }).then(function (result) {
            if (result) {
                console.debug('Resultado despues get By Id :::: >', result);
                var gestion = result.dataValues;
                cb(null, gestion);
            } else {
                cb(null, null);
            }
        }).catch(function (err) {
            cb(err, null);
        });
    }
}