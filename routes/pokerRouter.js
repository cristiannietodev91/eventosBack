var express = require('express');
var pokerController = require('../controller/pokerController')
var router = express.Router();

/* GET users listing. */
router.post('/validateEscalera', pokerController.validateEscalera);


module.exports = router;
