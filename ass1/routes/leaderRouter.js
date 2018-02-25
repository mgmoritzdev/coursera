const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
  })
  .get((req, res, next) => {
    res.end('Will send all the leaders to you');
  })
  .post((req, res, next) => {
    const {name, description} = req.body;
    res.end(`Will add the leader ${name} with details ${description}`);
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported /leaders');
  })
  .delete((req, res, next) => {
    res.end('Deleting all the leaders!');
  });

leaderRouter.route('/:leaderId')
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
  })
  .get((req, res, next) => {
    res.end(`Will send to you the leader ${req.params.leaderId}`);
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported /leaders');
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    const response = [
      `Will modify the leader ${req.params.leaderId}`,
      `with name = ${req.body.name} and`,
      `description = ${req.body.description}`
    ].join(' ');
    res.end(response);
  })
  .delete((req, res, next) => {
    res.end(`Will delete the leader with id = ${req.params.leaderId}`);
  });

module.exports = leaderRouter;
