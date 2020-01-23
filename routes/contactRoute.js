var express = require('express');
var contactController = require('../controller/contactoController')
var router = express.Router();

/* GET users listing. */
router.get('/getAll', contactController.getAllContactos);

router.get('/getById/:Id', contactController.findContactoById);

router.post('/create', contactController.createContacto);

router.put('/update/:Id', contactController.updateContacto);

router.delete('/deleteById/:Id', contactController.deleteContactById);

module.exports = router;
