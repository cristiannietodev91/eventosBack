const models = require("../database/models");

module.exports = {
    findAll: function (cb) {
        // Find all users
        models.tipificacionescontact.findAll().then(tipificaciones => {
            cb(null, tipificaciones);
        });
    },
    getById: function (idtipificacion, cb) {
        // Find all users
        return models.sequelize.transaction((t1) => {
            return models.tipificacionescontact.findByPk(idtipificacion).then(tipificacion => {
                return tipificacion;
            });
        }).then(function (result) {
            if (result) {
                console.debug('Resultado despues getTelefono By Id :::: >', result);
                var tipificacion = result.dataValues;
                cb(null, tipificacion);
            } else {
                cb(null, null);
            }
        }).catch(function (err) {
            cb(err, null);
        });
    }
}