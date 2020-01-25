var express = require('express');
var telefonoController = require('../controller/telefonoController')
var router = express.Router();

/* GET users listing. */
router.get('/getAll', telefonoController.getAllTelefonos);

router.get('/getById/:Id', telefonoController.findTelefonoById);

router.post('/create', telefonoController.createTelefono);

router.put('/update/:Id', telefonoController.updateTelefono);

router.delete('/deleteById/:Id', telefonoController.deleteTelefonoById);

module.exports = router;
