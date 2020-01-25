var express = require('express');
var cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var contactRouter = require('./routes/contactRoute');
var telefonoRouter = require('./routes/telefonoRouter');
var tipificacionRouter = require('./routes/tipificacionesRouter');
var gestionContactoRouter = require('./routes/gestionContactoRoute');
var gestionTelefonoRouter = require('./routes/gestionTelefonoRoute');


var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/contact', contactRouter);
app.use('/telefono', telefonoRouter);
app.use('/tipificacion', tipificacionRouter);
app.use('/gestionContacto', gestionContactoRouter);
app.use('/gestionTelefono', gestionTelefonoRouter);



app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);


module.exports = app;


function logErrors(err, req, res, next) {
    console.error(err.stack);
    next(err);
}


function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.status(500).send({ error: 'Something failed!' });
    } else {
        next(err);
    }
}


function errorHandler(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
}



