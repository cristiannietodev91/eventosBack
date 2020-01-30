var express = require('express');
var gestionTelefonoController = require('../controller/gestionTelefonoController')
var router = express.Router();

/* GET users listing. */
router.post('/createGestion', gestionTelefonoController.createGestion);

router.get('/getById/:Id', gestionTelefonoController.findGestionById);

router.get('/getAll', gestionTelefonoController.getAllGestiones);

router.get('/getAllByIdentificacion', gestionTelefonoController.getAllGestionesByIdentificacion);



module.exports = router;
