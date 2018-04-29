const express = require('express');
const path = require('path');

const indexRouter = express.Router();

indexRouter.route('/')
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
  })
  .get((req, res, next) => {
    res.end(path.join(__dirname + '../public/index.html'));
  });

module.exports = indexRouter;
