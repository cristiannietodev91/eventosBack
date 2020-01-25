var gestionContactoDAO = require('../dao/gestionContactDAO');
var HttpStatus = require('http-status-codes');

const getAllGestiones = (req, res, next) => {
    try {
        gestionContactoDAO.findAll(function (error, gestiones) {
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
        gestionContactoDAO.create(gestion, function (error, gestion) {
            if (error) {
                console.error('Error al realizar la transaccion de crear gestion:::>', 'error ::>', error);
                if (error.errors) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.errors[0] });
                } else {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
                }
            } else {
                if (gestion) {
                    gestionContactoDAO.getById(gestion.idgestioncuenta, function (error, gestion) {
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
        var idgestioncuenta = req.params.Id;
        //console.debug('Parametro de Idusuario recibido :::::>', req.params);
        gestionContactoDAO.getById(idgestioncuenta, function (error, gestion) {
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
    createGestion,
    findGestionById
}
