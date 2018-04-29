const getUnauthorizedError = (req, res, next, addHeaders) => {
  const err = new Error('You are not authenticated!');
  if (addHeaders) {
    res.setHeader('WWW-Authenticate', 'Basic');
  }
  err.status = 401;
  return next(err);
};

const auth = (req, res, next) => {
  console.log(req.session);

  if (!req.session.user) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return getUnauthorizedError(req, res, next, true);
    }

    const auth = new Buffer(authHeader.split(' ')[1], 'base64')
          .toString()
          .split(':');
    const username = auth[0];
    const password = auth[1];

    if (username === 'username' && password === 'password') {
      req.session.user = username;
      next();
    } else {
      return getUnauthorizedError(req, res, next, true);
    }
  } else {
    if (req.session.user === 'username') {
      next();
    } else {
      return getUnauthorizedError(req, res, next, false);
    }
  }
};

module.exports = auth;
