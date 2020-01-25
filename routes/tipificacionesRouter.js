var express = require('express');
var tipificacionesController = require('../controller/tipificacionesController')
var router = express.Router();

/* GET users listing. */
router.get('/getAllTipificacionesContacto', tipificacionesController.getAllTipificacionesContacto);

router.get('/getAllTipificacionesTel', tipificacionesController.getAllTipificacionesTelefono);

module.exports = router;
