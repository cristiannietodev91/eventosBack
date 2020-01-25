var tipificacionTelefonoDAO = require('../dao/tipificacionesTelefonoDAO');
var tipificacionContactoDAO = require('../dao/tipificacionesContactDAO');
var HttpStatus = require('http-status-codes');

const getAllTipificacionesTelefono = (req, res, next) => {
    try {
        tipificacionTelefonoDAO.findAll(function (error, tipificaciones) {
            if (error) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: error.errors[0] });
            } else {
                if (tipificaciones) {
                    res.status(HttpStatus.OK).json(tipificaciones);
                }
            }
        });
    } catch (error) {
        console.error('Error al listar tipificacion ', error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

const getAllTipificacionesContacto = (req, res, next) => {
    try {
        tipificacionContactoDAO.findAll(function (error, tipificaciones) {
            if (error) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: error.errors[0] });
            } else {
                if (tipificaciones) {
                    res.status(HttpStatus.OK).json(tipificaciones);
                }
            }
        });
    } catch (error) {
        console.error('Error al listar tipificacion ', error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}






module.exports = {
    getAllTipificacionesTelefono,
    getAllTipificacionesContacto
}
