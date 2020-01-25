var express = require('express');
var gestionTelefonoController = require('../controller/gestionTelefonoController')
var router = express.Router();

/* GET users listing. */
router.get('/createGestion', gestionTelefonoController.createGestion);

router.get('/getById/:Id', gestionTelefonoController.findGestionById);

router.post('/getAll', gestionTelefonoController.getAllGestiones);

module.exports = router;
