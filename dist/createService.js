'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serviceDefaultProps = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Service = require('./Service.js');

var _Service2 = _interopRequireDefault(_Service);

var _definitions = require('./definitions.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const serviceDefaultProps = exports.serviceDefaultProps = ({
  form,
  fields,
  filters,
  database
}) => ({
  definitions: form,
  options: { fields, filters },
  database
});

const createResourceService = (model, {
  only = _definitions.ACTIONS,
  definitions = {},
  options = {},
  custom = {},
  database
}) => {
  const methods = {};

  only.forEach(action => {
    methods[action] = req => _Service2.default[action](req, model, { definitions, options, database });
  });

  return _extends({}, methods, custom);
};

exports.default = createResourceService;