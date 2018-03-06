const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// mongoose.Promise = require('bluebird');

const Dishes = require('../models/dishes');

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    next();
  })
  .get((req, res, next) => {
    Dishes.find({})
      .then((dishes) => {
        res.json(dishes);
      }, (err) => next(err))
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    Dishes.create(req.body)
      .then((dish) => {
        res.json(dish);
      });
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported /dishes');
  })
  .delete((req, res, next) => {
    Dishes.remove({})
      .then((response) => {
        res.json(response);
      });
  });

dishRouter.route('/:dishId')
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    next();
  })
  .get((req, res, next) => {
    Dishes
      .findById(req.params.dishId)
      .then((dish) => {
        res.json(dish);
      }, (err) => next(err))
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'text/plain');
    res.end('POST operation not supported /dishes');
  })
  .put((req, res, next) => {
    Dishes.findByIdAndUpdate(req.params.dishId, {
      $set: req.body
    }, {new: true})
      .then((dish) => {
        res.json(dish);
      }, (err) => next(err))
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    Dishes.findByIdAndRemove(req.params.dishId)
      .then((response) => {
        res.json(response);
      }, (err) => next(err))
      .catch((err) => next(err));
  });

module.exports = dishRouter;
