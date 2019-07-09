const R = require('ramda');

const string = R.compose(Boolean, R.length);

const number = num => Number.isInteger(parseInt(num, 10));

const float = num => !Number.isNaN(parseFloat(num));

const bool = val => typeof Boolean(val) === 'boolean';

module.exports = {
  string,
  number,
  float,
  bool,
};
