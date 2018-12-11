import jwt from 'jsonwebtoken';

const getToken = (req) => {
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

const onlyUser = (req, res, next) => {
  let filter = 'UserId';

  if (req.route.path === '/api/v1/users/') {
    filter = 'id';
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


const createMiddleware = jwtEncryption => ([
  checkAuth(jwtEncryption),
  onlyUser,
]);

export default createMiddleware;
