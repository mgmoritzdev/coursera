const getUnauthorizedError = (req, res, next) => {
  const err = new Error('You are not authenticated!');
  res.setHeader('WWW-Authenticate', 'Basic');
  err.status = 401;
  return next(err);
};

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return getUnauthorizedError(req, res, next);
  }

  const auth = new Buffer(authHeader.split(' ')[1], 'base64')
        .toString()
        .split(':');
  const username = auth[0];
  const password = auth[1];

  if (username === 'username' && password === 'password') {
    next();
  } else {
    return getUnauthorizedError(req, res, next);
  }
};

module.exports = auth;
