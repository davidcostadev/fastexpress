const jwt = require('jsonwebtoken');

const getToken = req => {
  if (typeof req.body.token !== 'undefined') {
    return req.body.token;
  }
  if (typeof req.query.token !== 'undefined') {
    return req.query.token;
  }
  if (typeof req.headers.authorization !== 'undefined') {
    return req.headers.authorization.replace('Bearer ', '');
  }

  return null;
};

const checkAuth = jwtEncryption => (req, res, next) => {
  const token = getToken(req);

  if (!token) {
    res.status(403).send({
      message: 'No token provided',
    });
  } else {
    jwt.verify(token, jwtEncryption, (err, decoded) => {
      if (err) {
        res.status(500).send({
          message: 'Invalid auth token provided.',
        });
      } else {
        res.user = decoded;

        next();
      }
    });
  }
};

// eslint-disable-next-line consistent-return
const onlyUser = (req, res, next) => {
  const filter = 'UserId';

  if (req.route.path.includes('users/:id') && res.user.id.toString() !== req.params.id) {
    return res.status(500).send({
      message: 'No permission',
    });
  }

  req.query = {
    ...req.query,
    [filter]: res.user.id,
  };

  req.body = {
    ...req.body,
    [filter]: res.user.id,
  };

  next();
};

const createMiddleware = jwtEncryption => [checkAuth(jwtEncryption), onlyUser];

module.exports = createMiddleware;
