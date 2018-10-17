'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.journalFilters = exports.transactionFilters = exports.categoryFilters = exports.accountFilters = exports.userFilters = exports.dateFilter = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _sequelize = require('sequelize');

var _selectorTypes = require('./selectorTypes.js');

const dateFilter = exports.dateFilter = {
  validation: () => true,
  convert: val => {
    if (val.indexOf(',') > -1) {
      const parts = val.split(',');
      const [start, end] = parts;
      return {
        [_sequelize.Op.gte]: start,
        [_sequelize.Op.lte]: end
      };
    }

    return val;
  }
};

const createdAt = dateFilter;
const updated = dateFilter;

const timestamp = {
  createdAt,
  updated
};

const userFilters = exports.userFilters = _extends({
  id: _selectorTypes.userIdSelType,
  name: _selectorTypes.nameSelType,
  email: _selectorTypes.emailSelType
}, timestamp);

const accountFilters = exports.accountFilters = _extends({
  UserId: _selectorTypes.userIdSelType,
  name: _selectorTypes.nameSelType,
  type: _selectorTypes.typeSelType,
  initalValue: _selectorTypes.valueSelType
}, timestamp);

const categoryFilters = exports.categoryFilters = _extends({
  UserId: _selectorTypes.userIdSelType,
  name: _selectorTypes.nameSelType,
  type: _selectorTypes.typeSelType
}, timestamp);

const transactionFilters = exports.transactionFilters = _extends({
  UserId: _selectorTypes.userIdSelType,
  AccountId: _selectorTypes.accountIdSelType,
  name: _selectorTypes.nameSelType,
  value: _selectorTypes.valueSelType,
  type: _selectorTypes.typeSelType,
  isPaid: _selectorTypes.isPaidSelType,
  transactionDate: dateFilter
}, timestamp);

const journalFilters = exports.journalFilters = _extends({
  UserId: _selectorTypes.userIdSelType,
  type: _selectorTypes.typeSelType
}, timestamp);