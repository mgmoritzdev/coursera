const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const auth = require('./auth');
const index = require('./routes/indexRouter');
const userRouter = require('./routes/userRouter');
const dishRouter = require('./routes/dishRouter');

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

app.use('/', index);
app.use('/users', userRouter);
app.use(auth.auth);
app.use(express.static(path.join(__dirname, 'public')));

// add an authenticated route to test
app.use('/dishes', dishRouter);

app.listen(port);
