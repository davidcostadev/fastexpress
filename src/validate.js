const R = require('ramda');

/**
 * Check empty string
 *
 * @param {string} string
 *
 * @return {string}
 */
const string = R.compose(Boolean, R.length);

/**
 * Check if this is a integer number
 *
 * @param {string} num
 * @returns {boolean}
 */
const number = num => Number.isInteger(parseInt(num, 10));

/**
 * Convert to number
 *
 * @param {string} num
 *
 * @return {number}
 */
const float = num => !Number.isNaN(parseFloat(num));

/**
 * Convert to bollean
 *
 * @param {string} num
 *
 * @return {boolean}
 */
const bool = val => typeof Boolean(val) === 'boolean';

module.exports = {
  string,
  number,
  float,
  bool,
};
