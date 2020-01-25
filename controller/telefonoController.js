var telefonoDAO = require('../dao/telefonoDAO');
var HttpStatus = require('http-status-codes');

const getAllTelefonos = (req, res, next) => {
    try {
        telefonoDAO.findAll(function (error, telefonos) {
            if (error) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: error.errors[0] });
            } else {
                if (telefonos) {
                    res.status(HttpStatus.OK).json(telefonos);
                }
            }
        });
    } catch (error) {
        console.error('Error al listar telefonos ', error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}


const createTelefono = (req, res, next) => {
    try {
        var telefono = req.body;
        console.debug('Parametro telefono recibido :::::>', telefono);
        telefonoDAO.create(telefono, function (error, telefono) {
            if (error) {
                console.error('Error al realizar la transaccion de crear telefono:::>', 'error ::>', error);
                if (error.errors) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.errors[0] });
                } else {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
                }
            } else {
                if (telefono) {
                    telefonoDAO.getById(telefono.idtelefono, function (error, telefono) {
                        if (error) {
                            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.errors[0] });
                        } else {
                            if (telefono) {
                                return res.status(HttpStatus.OK).json(telefono);
                            } else {
                                return res.status(HttpStatus.OK).json({});
                            }
                        }
                    });
                } else {
                    return res.status(HttpStatus.OK).json({ error: "No se creo el telefono" });
                }
            }
        });
    } catch (error) {
        console.error('Error al crear telefono ', error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

const updateTelefono = (req, res, next) => {
    try {
        var idtelefono = req.params.Id;
        var telefono = req.body;
        if (idtelefono) {
            telefonoDAO.update(idtelefono, telefono, function (error, telefono) {
                if (error) {
                    console.error('Error al realizar la transaccion de actualizar telefono:::>', 'error ::>', error.message);
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.errors[0] });
                } else {
                    if (telefono) {
                        return res.status(HttpStatus.ACCEPTED).json({ message: 'Se actualizo el idtelefono ' + idtelefono + ' correctamente' });
                    } else {
                        return res.status(HttpStatus.OK).json({ error: "No se actualizo el contacto" });
                    }
                }
            });
        } else {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: "El parametro idtelefono es requerido" });
        }
    } catch (error) {
        console.error('Error al actualizar telefono ', error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

const deleteTelefonoById = (req, res, next) => {
    try {
        var idtelefono = req.params.Id;
        console.debug('Parametro de idtelefono recibido :::::>', idtelefono);
        telefonoDAO.deleteById(idtelefono, function (error, result) {
            if (error) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.errors[0] });
            } else {
                if (result) {
                    return res.status(HttpStatus.ACCEPTED).json({ message: 'Se elimino el idtelefono ' + idtelefono + ' correctamente' });
                } else {
                    return res.status(HttpStatus.OK).json({ message: 'Id no encontrado' });
                }
            }
        });
    } catch (error) {
        console.error('Error al borrar Telefono By Id ', error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

const findTelefonoById = (req, res, next) => {
    try {
        var idtelefono = req.params.Id;
        //console.debug('Parametro de Idusuario recibido :::::>', req.params);
        telefonoDAO.getById(idtelefono, function (error, telefono) {
            if (error) {
                if (error.errors) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.errors[0] });
                } else {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
                }                
            } else {
                if (telefono) {
                    return res.status(HttpStatus.OK).json(telefono);
                } else {
                    return res.status(HttpStatus.OK).json({});
                }
            }
        });
    } catch (error) {
        console.error('Error al buscar telefono By Id ', error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}



module.exports = {
    getAllTelefonos,
    createTelefono,
    updateTelefono,
    deleteTelefonoById,
    findTelefonoById
}
