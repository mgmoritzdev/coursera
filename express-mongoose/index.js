const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const dishRouter = require('./routes/dishRouter');
const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const host = 'http://localhost';
const port = 3000;

const connect = mongoose.connect(url, {});
connect.then((conn) => {

});

var app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

// static files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));
app.use('dishes', dishRouter);

app.listen(3000);
