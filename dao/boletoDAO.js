const models = require("../database/models");


module.exports = {
    /**
     * Funcion del patron DAO que consulta todos los boletos
     * en la base de datos
     * @param {*} cb funcion callback (error,listaObjectos)
     * 
     */
    findAll: function (cb) {
        // Find all users
        models.boleto.findAll().then(boletos => {
            cb(null, boletos);
        });
    },
    /**
     * Funcion DAO encargada de crear
     * @param {boleto} boleto Boleto a crear en la base de datos
     * @param {*} cb funcion callback (error,objetocreado)
     */
    create: function (boleto, cb) {
        // Find all users
        return models.sequelize.transaction((t1) => {
            return models.boleto.create(boleto).then(boleto => {
                return boleto;
            });
        }).then(function (result) {
            if (result) {
                console.debug('Resultado despues de crear boleto :::: >', result);
                var boletoCreated = result.dataValues;
                cb(null, boletoCreated);
            } else {
                cb(null, null);
            }

        }).catch(function (err) {
            cb(err, null);
        });
    },
    /**
     * Funcion DAO que busca un boleto por Id en la base de datos de eventos
     * @param {*} idboleto IdBoleto a buscar
     * @param {*} cb Funcion callback que retorna (error,objetoencontrado) if error no es null ocurrio un error en el proceso
     */
    getById: function (idboleto, cb) {
        // Find all users
        return models.sequelize.transaction((t1) => {
            return models.boleto.findByPk(idboleto).then(boleto => {
                return boleto;
            });
        }).then(function (result) {
            if (result) {
                console.debug('Resultado despues getBoleto By Id :::: >', result);
                var boleto = result.dataValues;
                cb(null, boleto);
            } else {
                cb(null, null);
            }
        }).catch(function (err) {
            cb(err, null);
        });
    }
    
}