const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const auth = require('./auth');

const port = 3000;

var app = express();
app.use(bodyParser.json());
app.use(auth);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port);
