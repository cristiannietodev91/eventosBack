var eventoDAO = require('../dao/eventoDAO');
var HttpStatus = require('http-status-codes');

/**
 * Funcion que recibe una peticio HTTP y devuelve 
 * todos los eventos en la BD de eventos
 * @param {*} req 
 * @param {*} res 
 * @param {*} next
 * @returns {JSON} 
 */
const getAllEventos = (req, res, next) => {
    try {
        eventoDAO.findAll(function (error, eventos) {
            if (error) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: error.errors[0] });
            } else {
                if (eventos) {
                    res.status(HttpStatus.OK).json(eventos);
                }
            }
        });
    } catch (error) {
        console.error('Error al listar eventos ', error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

/**
 * Funcion que recibe una peticion http y crea un evento en la BD
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns {JSON}
 */
const createEvento = (req, res, next) => {
    try {
        var evento = req.body;
        console.debug('Parametro evento recibido :::::>', evento);
        eventoDAO.create(evento, function (error, evento) {
            if (error) {
                console.error('Error al realizar la transaccion de crear evento:::>', 'error ::>', error);
                if (error.errors) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.errors[0] });
                } else {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
                }
            } else {
                if (evento) {
                    eventoDAO.getById(evento.idevento, function (error, evento) {
                        if (error) {
                            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.errors[0] });
                        } else {
                            if (evento) {
                                return res.status(HttpStatus.OK).json(evento);
                            } else {
                                return res.status(HttpStatus.OK).json({});
                            }
                        }
                    });
                } else {
                    return res.status(HttpStatus.OK).json({ error: "No se creo el evento" });
                }
            }
        });
    } catch (error) {
        console.error('Error al crear evento ', error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

/**
 * Funcion Controller que recibe una peticion http y actualiza un evento en la BD
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns {JSON}
 */
const updateEvento = (req, res, next) => {
    try {
        var idevento = req.params.Id;
        var evento = req.body;
        if (idevento) {
            eventoDAO.update(idevento, evento, function (error, evento) {
                if (error) {
                    console.error('Error al realizar la transaccion de actualizar evento:::>', 'error ::>', error.message);
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.errors[0] });
                } else {
                    if (evento) {
                        return res.status(HttpStatus.ACCEPTED).json({ message: 'Se actualizo el evento ' + idevento + ' correctamente' });
                    } else {
                        return res.status(HttpStatus.OK).json({ error: "No se actualizo el evento" });
                    }
                }
            });
        } else {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: "El parametro idevento es requerido" });
        }
    } catch (error) {
        console.error('Error al actualizar evento ', error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

/**
 * Funcion capa controller encargada de eliminar un evento
 * en la BD
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns {JSON}
 */
const deleteEventoById = (req, res, next) => {
    try {
        var idevento = req.params.Id;
        console.debug('Parametro de IdEvento recibido :::::>', idevento);
        eventoDAO.deleteById(idevento, function (error, result) {
            if (error) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.errors[0] });
            } else {
                if (result) {
                    return res.status(HttpStatus.ACCEPTED).json({ message: 'Se elimino el evento ' + idevento + ' correctamente' });
                } else {
                    return res.status(HttpStatus.OK).json({ message: 'Id no encontrado' });
                }
            }
        });
    } catch (error) {
        console.error('Error al borrar evento By Id ', error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

/**
 * Funcion controller que recibe una peticion HTTP y en los parametros
 * el Id del evento a buscar
 * y devuelve un evento
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns {JSON}
 */
const findEventoById = (req, res, next) => {
    try {
        var idevento = req.params.Id;
        //console.debug('Parametro de Idusuario recibido :::::>', req.params);
        eventoDAO.getById(idevento, function (error, evento) {
            if (error) {
                if (error.errors) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.errors[0] });
                } else {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
                }
            } else {
                if (evento) {
                    return res.status(HttpStatus.OK).json(evento);
                } else {
                    return res.status(HttpStatus.OK).json({});
                }
            }
        });
    } catch (error) {
        console.error('Error al buscar evento By Id ', error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

/**
 * Funcion que recibe una peticion HTTP y segun el filtro(JSON) recibido en la
 * peticion devuelve el evento enconntrado solamente uno
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns {JSON}
 */
const geEventoByFilter = (req, res, next) => {
    try {
        var filter = req.body;
        console.debug('Filtro de busqueda :::::>', filter);

        eventoDAO.findOneByFilter({ filter: filter }, function (error, evento) {
            if (error) {
                console.error('Error al realizar la transaccion de buscar Contacto:::>', 'error ::>', error.message);
                if (error.errors) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.errors[0] });
                } else {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
                }
            } else {
                if (evento) {
                    res.status(HttpStatus.OK).json(evento);
                }
            }
        });
    } catch (error) {
        console.error('Error al listar eventos ', error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}



module.exports = {
    getAllEventos,
    createEvento,
    updateEvento,
    deleteEventoById,
    findEventoById,
    geEventoByFilter
}
