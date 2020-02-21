var express = require('express');
var boletoController = require('../controller/boletoController')
var router = express.Router();

/* GET users listing. */
router.post('/create', boletoController.createBoleto);

router.get('/getAll', boletoController.getAllBoletos);


module.exports = router;
