var contactoDAO = require('../dao/contactoDAO');
var HttpStatus = require('http-status-codes');

const getAllContactos = (req, res, next) => {
    try {
        contactoDAO.findAll(function (error, contactos) {
            if (error) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: error.errors[0] });
            } else {
                if (contactos) {
                    res.status(HttpStatus.OK).json(contactos);
                }
            }
        });
    } catch (error) {
        console.error('Error al listar contactos ', error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}


const createContacto = (req, res, next) => {
    try {
        var contacto = req.body;
        console.debug('Parametro contacto recibido :::::>', contacto);
        contactoDAO.create(contacto, function (error, contacto) {
            if (error) {
                console.error('Error al realizar la transaccion de crear contacto:::>', 'error ::>', error);
                if (error.errors) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.errors[0] });
                } else {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
                }
            } else {
                if (contacto) {
                    contactoDAO.getById(contacto.IdContacts, function (error, contacto) {
                        if (error) {
                            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.errors[0] });
                        } else {
                            if (contacto) {
                                return res.status(HttpStatus.OK).json(contacto);
                            } else {
                                return res.status(HttpStatus.OK).json({});
                            }
                        }
                    });
                } else {
                    return res.status(HttpStatus.OK).json({ error: "No se creo el contacto" });
                }
            }
        });
    } catch (error) {
        console.error('Error al crear contacto ', error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

const updateContacto = (req, res, next) => {
    try {
        var IdContacts = req.params.Id;
        var contact = req.body;
        if (IdContacts) {
            contactoDAO.update(IdContacts, contact, function (error, contact) {
                if (error) {
                    console.error('Error al realizar la transaccion de actualizar contacto:::>', 'error ::>', error.message);
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.errors[0] });
                } else {
                    if (contact) {
                        return res.status(HttpStatus.ACCEPTED).json({ message: 'Se actualizo el IdContacts ' + IdContacts + ' correctamente' });
                    } else {
                        return res.status(HttpStatus.OK).json({ error: "No se actualizo el contacto" });
                    }
                }
            });
        } else {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: "El parametro IdContacts es requerido" });
        }
    } catch (error) {
        console.error('Error al actualizar contacto ', error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

const deleteContactById = (req, res, next) => {
    try {
        var IdContacts = req.params.Id;
        console.debug('Parametro de IdContacts recibido :::::>', IdContacts);
        contactoDAO.deleteById(IdContacts, function (error, result) {
            if (error) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.errors[0] });
            } else {
                if (result) {
                    return res.status(HttpStatus.ACCEPTED).json({ message: 'Se elimino el IdContacts ' + IdContacts + ' correctamente' });
                } else {
                    return res.status(HttpStatus.OK).json({ message: 'Id no encontrado' });
                }
            }
        });
    } catch (error) {
        console.error('Error al borrar Contacto By Id ', error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

const findContactoById = (req, res, next) => {
    try {
        var IdContacts = req.params.Id;
        //console.debug('Parametro de Idusuario recibido :::::>', req.params);
        contactoDAO.getById(IdContacts, function (error, contact) {
            if (error) {
                if (error.errors) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.errors[0] });
                } else {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
                }                
            } else {
                if (contact) {
                    return res.status(HttpStatus.OK).json(contact);
                } else {
                    return res.status(HttpStatus.OK).json({});
                }
            }
        });
    } catch (error) {
        console.error('Error al buscar contacto By Id ', error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}



module.exports = {
    getAllContactos,
    createContacto,
    updateContacto,
    deleteContactById,
    findContactoById
}
