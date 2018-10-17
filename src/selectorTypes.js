'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pageSelType = exports.limitSelType = exports.updatedAtSelType = exports.createdAtSelType = exports.batchSelType = exports.isPaidSelType = exports.transactionDateSelType = exports.transferDateSelType = exports.accountToIdSelType = exports.typeSelType = exports.accountFromIdSelType = exports.categoryIdSelType = exports.accountIdSelType = exports.userIdSelType = exports.valueSelType = exports.enabledSelType = exports.passwordSelType = exports.emailSelType = exports.nameSelType = exports.orderType = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _validate = require('./validate.js');

var validate = _interopRequireWildcard(_validate);

var _convert = require('./convert.js');

var convert = _interopRequireWildcard(_convert);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const stringType = {
  validation: validate.string
};

const numberType = {
  validation: validate.number
};

const floatType = {
  validation: validate.float,
  convert: val => {
    if (typeof val === 'string') {
      return val.replace(',', '.');
    }

    return val;
  }
};

const boolType = {
  validation: validate.bool
};

const datetimeType = {
  validation: validate.string
};

const dateType = {
  validation: validate.string,
  convert: val => (0, _moment2.default)(val).format('YYYY-MM-DD')
};

const orderType = exports.orderType = {
  validation: validate.string,
  convert: convert.orderToFilter,
  default: [['id', 'DESC']]
};

const nameSelType = exports.nameSelType = stringType;

const emailSelType = exports.emailSelType = stringType;

const passwordSelType = exports.passwordSelType = stringType;

const enabledSelType = exports.enabledSelType = boolType;

const valueSelType = exports.valueSelType = floatType;

const userIdSelType = exports.userIdSelType = numberType;

const accountIdSelType = exports.accountIdSelType = numberType;

const categoryIdSelType = exports.categoryIdSelType = numberType;

const accountFromIdSelType = exports.accountFromIdSelType = numberType;

const typeSelType = exports.typeSelType = stringType;

const accountToIdSelType = exports.accountToIdSelType = numberType;

const transferDateSelType = exports.transferDateSelType = stringType;

const transactionDateSelType = exports.transactionDateSelType = dateType;

const isPaidSelType = exports.isPaidSelType = boolType;

const batchSelType = exports.batchSelType = stringType;

const createdAtSelType = exports.createdAtSelType = datetimeType;

const updatedAtSelType = exports.updatedAtSelType = datetimeType;

const limitSelType = exports.limitSelType = _extends({}, numberType, {
  default: 100
});

const pageSelType = exports.pageSelType = _extends({}, numberType, {
  default: 1
});