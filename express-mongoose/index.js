const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Dishes = require('./models/dishes');
const url = 'mongodb://localhost:27017/conFusion';

const connect = mongoose.connect(url, {});
connect.then((conn) => {

});
var app = express();

app.listen(3000);
