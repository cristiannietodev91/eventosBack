var express = require('express');
var tipificacionesController = require('../controller/tipificacionesController')
var router = express.Router();

/* GET users listing. */
router.post('/createTipificacionContacto', tipificacionesController.createTipificacionContacto);

router.get('/getAllTipificacionesContacto', tipificacionesController.getAllTipificacionesContacto);

router.post('/createTipificacionTelefono', tipificacionesController.createTipificacionTelefono);

router.get('/getAllTipificacionesTel', tipificacionesController.getAllTipificacionesTelefono);



module.exports = router;
