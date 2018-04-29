const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const auth = require('./auth');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const port = 3000;

var app = express();
app.use(bodyParser.json());
app.use(session({
  name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}));

app.use(auth);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port);
