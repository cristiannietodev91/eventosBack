var tipificacionTelefonoDAO = require('../dao/tipificacionesTelefonoDAO');
var tipificacionContactoDAO = require('../dao/tipificacionesContactDAO');
var HttpStatus = require('http-status-codes');

const getAllTipificacionesTelefono = (req, res, next) => {
    try {
        tipificacionTelefonoDAO.findAll(async function (error, tipificaciones) {
            if (error) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: error.errors[0] });
            } else {
                if (tipificaciones) {
                    var tipificacionesResult = [];
                    var arbol = tipificaciones[0].arbol;
                    console.debug('Arbol padre  :::: >', arbol.tipificaciones);
                    for await (var tipificacion of arbol.tipificaciones) {
                        console.debug('Tipificacion padre  :::: >', arbol.tipificaciones);
                        if (tipificacion.childs) {
                            for await (var child of tipificacion.childs) {
                                console.debug('Objeto hijo :::: >', child);
                                if (child.childs) {

                                } else {
                                    tipificacionesResult.push(child);
                                }
                            }
                        }
                    }
                    res.status(HttpStatus.OK).json(tipificacionesResult);
                }
            }
        });
    } catch (error) {
        console.error('Error al listar tipificacion ', error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

const createTipificacionTelefono = (req, res, next) => {
    try {
        var tipificacion = req.body;
        console.debug('Parametro telefono recibido :::::>', tipificacion);
        tipificacionTelefonoDAO.create(tipificacion, function (error, tipificacion) {
            if (error) {
                console.error('Error al realizar la transaccion de crear tipificacion:::>', 'error ::>', error);
                if (error.errors) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.errors[0] });
                } else {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
                }
            } else {
                if (tipificacion) {
                    tipificacionTelefonoDAO.getById(tipificacion.idtipificaciontel, function (error, tipificacion) {
                        if (error) {
                            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.errors[0] });
                        } else {
                            if (tipificacion) {
                                return res.status(HttpStatus.OK).json(tipificacion);
                            } else {
                                return res.status(HttpStatus.OK).json({});
                            }
                        }
                    });
                } else {
                    return res.status(HttpStatus.OK).json({ error: "No se creo la tipificacion" });
                }
            }
        });
    } catch (error) {
        console.error('Error al crear tipificacion ', error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

const createTipificacionContacto = (req, res, next) => {
    try {
        var tipificacion = req.body;
        console.debug('Parametro telefono recibido :::::>', tipificacion);
        tipificacionContactoDAO.create(tipificacion, function (error, tipificacion) {
            if (error) {
                console.error('Error al realizar la transaccion de crear tipificacion:::>', 'error ::>', error);
                if (error.errors) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.errors[0] });
                } else {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
                }
            } else {
                if (tipificacion) {
                    tipificacionContactoDAO.getById(tipificacion.idtipificacioncontact, function (error, tipificacion) {
                        if (error) {
                            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.errors[0] });
                        } else {
                            if (tipificacion) {
                                return res.status(HttpStatus.OK).json(tipificacion);
                            } else {
                                return res.status(HttpStatus.OK).json({});
                            }
                        }
                    });
                } else {
                    return res.status(HttpStatus.OK).json({ error: "No se creo la tipificacion" });
                }
            }
        });
    } catch (error) {
        console.error('Error al crear tipificacion ', error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

const getAllTipificacionesContacto = (req, res, next) => {
    try {
        tipificacionContactoDAO.findAll(async function (error, tipificaciones) {
            if (error) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: error.errors[0] });
            } else {
                if (tipificaciones) {
                    var tipificacionesResult = [];
                    var arbol = tipificaciones[0].arbol;
                    console.debug('Arbol padre  :::: >', arbol.tipificaciones);
                    for await (var tipificacion of arbol.tipificaciones) {
                        console.debug('Tipificacion padre  :::: >', arbol.tipificaciones);
                        if (tipificacion.childs) {
                            for await (var child of tipificacion.childs) {
                                console.debug('Objeto hijo :::: >', child);
                                if (child.childs) {
                                    for await (var child2 of child.childs) {
                                        console.debug('Objeto hijo 2:::: >', child2);
                                        if (child2.childs) {

                                        } else {
                                            tipificacionesResult.push(child2);
                                        }
                                    }
                                } else {
                                    tipificacionesResult.push(child);
                                }
                            }
                        }
                    }
                    res.status(HttpStatus.OK).json(tipificacionesResult);
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
    getAllTipificacionesContacto,
    createTipificacionContacto,
    createTipificacionTelefono
}
