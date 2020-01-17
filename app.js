var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/usersRoute');
var tallerRouter = require('./routes/tallerRoute');
var vehiculoRouter = require('./routes/vehiculoRoute');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/usuario', usersRouter);
app.use('/taller', tallerRouter);
app.use('/vehiculo', vehiculoRouter);


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


