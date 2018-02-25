const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
  })
  .get((req, res, next) => {
    res.end('Will send all the promotions to you');
  })
  .post((req, res, next) => {
    const {name, description} = req.body;
    res.end(`Will add the promotion ${name} with details ${description}`);
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported /promotions');
  })
  .delete((req, res, next) => {
    res.end('Deleting all the promotions!');
  });

promoRouter.route('/:promoId')
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
  })
  .get((req, res, next) => {
    res.end(`Will send to you the promo ${req.params.promoId}`);
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported /promotions');
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    const response = [
      `Will modify the promo ${req.params.promoId}`,
      `with name = ${req.body.name} and`,
      `description = ${req.body.description}`
    ].join(' ');
    res.end(response);
  })
  .delete((req, res, next) => {
    res.end(`Will delete the promo with id = ${req.params.promoId}`);
  });

module.exports = promoRouter;
