const express = require('express');
const bodyParser = require('body-parser');
const User = require('./../models/user');
const auth = require('./../auth');

const userRouter = express.Router();
userRouter.use(bodyParser.json());

userRouter.route('/')
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
  })
  .get((req, res, next) => {
    res.end('Will send all the users to you');
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported /users');
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported /users');
  })
  .delete((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported /users');
  });

userRouter
  .route('/signup')
  .post((req, res, next) => {
    User.findOne({username: req.body.username})
      .then((user) => {
        if (user !== null) {
          var err = new Error(`User ${req.body.username} unavailable`);
          err.status = 403;
          next(err);
        }
        else {
          return User.create({
            username: req.body.username,
            password: req.body.password
          });
        }
      })
      .then((user) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({status: 'Registration Successful', user});
      }, (err) => next(err))
      .catch((err) => {
        next(err);
      });
  });

userRouter
  .route('/login')
  .post((req, res, next) => {
    auth.login(req, res, next);
  });

userRouter
  .route('/logout')
  .get((req, res, next) => {
    if (req.session) {
      req.session.destroy();
      res.clearCookie('session-id');
      res.redirect('/');
    } else {
      var err = new Error('You are not logged in');
      err.status = 403;
      next(err);
    }
  });

module.exports = userRouter;
