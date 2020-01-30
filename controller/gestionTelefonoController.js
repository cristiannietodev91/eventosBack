var gestionTelefonoDAO = require('../dao/gestionTelefonoDAO');
var HttpStatus = require('http-status-codes');

const getAllGestiones = (req, res, next) => {
    try {
        gestionTelefonoDAO.findAll(function (error, gestiones) {
            if (error) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: error.errors[0] });
            } else {
                if (gestiones) {
                    res.status(HttpStatus.OK).json(gestiones);
                }
            }
        });
    } catch (error) {
        console.error('Error al listar gestiones ', error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

const getAllGestionesByIdentificacion = (req, res, next) => {
    try {
        var identificacion = req.query.identificacion;
        console.debug('Parametro gestion recibido :::::>', req.query);

        gestionTelefonoDAO.findAllByFilter({ IdentificacionContacto : identificacion}, function (error, gestiones) {
            if (error) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: error.errors[0] });
            } else {
                if (gestiones) {
                    res.status(HttpStatus.OK).json(gestiones);
                }
            }
        });
    } catch (error) {
        console.error('Error al listar gestiones ', error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}


const createGestion = (req, res, next) => {
    try {
        var gestion = req.body;
        console.debug('Parametro gestion recibido :::::>', gestion);
        gestionTelefonoDAO.create(gestion, function (error, gestion) {
            if (error) {
                console.error('Error al realizar la transaccion de crear gestion:::>', 'error ::>', error);
                if (error.errors) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.errors[0] });
                } else {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
                }
            } else {
                if (gestion) {
                    gestionTelefonoDAO.getById(gestion.idgestiontelefono, function (error, gestion) {
                        if (error) {
                            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.errors[0] });
                        } else {
                            if (gestion) {
                                return res.status(HttpStatus.OK).json(gestion);
                            } else {
                                return res.status(HttpStatus.OK).json({});
                            }
                        }
                    });
                } else {
                    return res.status(HttpStatus.OK).json({ error: "No se creo la gestion" });
                }
            }
        });
    } catch (error) {
        console.error('Error al crear gestion ', error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

const findGestionById = (req, res, next) => {
    try {
        var idgestiontelefono = req.params.Id;
        //console.debug('Parametro de Idusuario recibido :::::>', req.params);
        gestionTelefonoDAO.getById(idgestiontelefono, function (error, gestion) {
            if (error) {
                if (error.errors) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.errors[0] });
                } else {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
                }
            } else {
                if (gestion) {
                    return res.status(HttpStatus.OK).json(gestion);
                } else {
                    return res.status(HttpStatus.OK).json({});
                }
            }
        });
    } catch (error) {
        console.error('Error al buscar gestion By Id ', error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}



module.exports = {
    getAllGestiones,
    getAllGestionesByIdentificacion,
    createGestion,
    findGestionById
}
