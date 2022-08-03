var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var recipesRouter = require('./routes/recipes');
var randomRouter = require('./routes/random');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');
    if ( req.method === "OPTIONS" ){
        res.header('Access-Control-Allow-Methods', 'GET');
        req.statusCode(200).json();
    }
    next();
})

app.use('/recipes', recipesRouter);
app.use('/random', randomRouter);

module.exports = app;
