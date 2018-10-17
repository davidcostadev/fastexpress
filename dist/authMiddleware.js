'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.middleware = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getToken = req => {
  if (typeof req.body.token !== 'undefined') {
    return req.body.token;
  } else if (typeof req.query.token !== 'undefined') {
    return req.query.token;
  } else if (typeof req.headers.authorization !== 'undefined') {
    return req.headers.authorization.replace('Bearer ', '');
  }

  return null;
};

const checkAuth = (req, res, next, jwtEncryption) => {
  const token = getToken(req);

  if (!token) {
    res.status(403).send({
      message: 'No token provided'
    });
  } else {
    _jsonwebtoken2.default.verify(token, jwtEncryption, (err, decoded) => {
      if (err) {
        res.status(500).send({
          message: 'Invalid auth token provided.'
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

  req.query = _extends({}, req.query, {
    [filter]: res.user.id
  });

  req.body = _extends({}, req.body, {
    [filter]: res.user.id
  });

  next();
};

const middleware = exports.middleware = [checkAuth, onlyUser];

exports.default = middleware;