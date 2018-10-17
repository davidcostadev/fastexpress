'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Controller = require('./Controller.js');

var _Controller2 = _interopRequireDefault(_Controller);

var _definitions = require('./definitions.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createResourceController = (service, { only = _definitions.ACTIONS, custom = {} } = {}) => {
  const methods = {};

  only.forEach(action => {
    methods[action] = (req, res) => _Controller2.default[action](req, res, service[action]);
  });

  return _extends({}, methods, custom);
};

exports.default = createResourceController;