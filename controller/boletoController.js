var boletoDAO = require('../dao/boletoDAO');
var HttpStatus = require('http-status-codes');

/**
 * Funcion que consulta todos los boletos en la base de dato
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getAllBoletos = (req, res, next) => {
    try {
        boletoDAO.findAll(function (error, boletos) {
            if (error) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: error.errors[0] });
            } else {
                if (boletos) {
                    res.status(HttpStatus.OK).json(boletos);
                }
            }
        });
    } catch (error) {
        console.error('Error al listar boletos ', error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

/**
 * Funcion que recibe una solicitud http
 * para crear un boleto
 * @param {*} req - 
 * @param {*} res 
 * @param {*} next 
 */
const createBoleto = (req, res, next) => {
    try {
        var boleto = req.body;
        console.debug('Parametro boleto recibido :::::>', boleto);
        boletoDAO.create(boleto, function (error, boleto) {
            if (error) {
                console.error('Error al realizar la transaccion de crear boleto:::>', 'error ::>', error);
                if (error.errors) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.errors[0] });
                } else {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
                }
            } else {
                if (boleto) {
                    boletoDAO.getById(boleto.idboleto, function (error, boleto)  {
                        if (error) {
                            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.errors[0] });
                        } else {
                            if (boleto) {
                                return res.status(HttpStatus.OK).json(boleto);
                            } else {
                                return res.status(HttpStatus.OK).json({});
                            }
                        }
                    });
                } else {
                    return res.status(HttpStatus.OK).json({ error: "No se creo el boleto" });
                }
            }
        });
    } catch (error) {
        console.error('Error al crear boleto ', error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}












module.exports = {
    getAllBoletos,
    createBoleto    
}
