'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bool = exports.float = exports.number = exports.string = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const string = exports.string = _ramda2.default.compose(Boolean, _ramda2.default.length);

const number = exports.number = num => Number.isInteger(parseInt(num, 10));

const float = exports.float = num => !Number.isNaN(parseFloat(num));

const bool = exports.bool = val => typeof Boolean(val) === 'boolean';