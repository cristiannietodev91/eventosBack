var express = require('express');
var gestionContactoController = require('../controller/gestionContactoController')
var router = express.Router();

/* GET users listing. */
router.get('/createGestion', gestionContactoController.createGestion);

router.get('/getById/:Id', gestionContactoController.findGestionById);

router.post('/getAll', gestionContactoController.getAllGestiones);

module.exports = router;
