'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const orderToFilter = exports.orderToFilter = val => {
  const fields = val.split(',').map(a => a.split('.'));

  return fields;
};

exports.default = orderToFilter;