const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const auth = require('./auth');
const cookieParser = require('cookie-parser');

const port = 3000;

var app = express();
app.use(bodyParser.json());
app.use(cookieParser('12345-67890-09876-54321'));

app.use(auth);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port);
