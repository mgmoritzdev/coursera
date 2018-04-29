const User = require('./models/user');

const getUnauthorizedError = (req, res, next, errMessage) => {
  const err = new Error(errMessage);
  err.status = 403;
  return next(err);
};

const login = (req, res, next) => {
  console.log(req.session);

  if (!req.session.user) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return getUnauthorizedError(req, res, next);
    }

    const auth = new Buffer(authHeader.split(' ')[1], 'base64')
          .toString()
          .split(':');
    const username = auth[0];
    const password = auth[1];

    User.findOne({username: username})
      .then((user) => {
        if (username === user.username && password === user.password) {
          req.session.user = 'authenticated';
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/plain');
          res.end('You are now authenticated');
        }
        else if (password !== user.password) {
          return getUnauthorizedError('Wrong password');
        } else if (user === null) {
          return getUnauthorizedError('Invalid user');
        }
      }).catch((err) => { console.error(err);}) ;
  } else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('You are already authenticated');
  }
};

const auth = (req, res, next) => {
  console.log(req.session);

  if (!req.session.user) {
    return getUnauthorizedError(req, res, next, 'You are not authenticated');
  } else {
    if (req.session.user === 'authenticated') {
      next();
    } else {
      return getUnauthorizedError(req, res, next, 'You are not authenticated');
    }
  }
};

module.exports = {
  auth,
  login
};
