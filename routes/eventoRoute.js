var express = require('express');
var eventoController = require('../controller/eventoController')
var router = express.Router();

/* GET users listing. */
router.post('/create', eventoController.createEvento);

router.get('/getById/:Id', eventoController.findEventoById);

router.get('/getAll', eventoController.getAllEventos);

router.put('/update/:Id', eventoController.updateEvento);

module.exports = router;
