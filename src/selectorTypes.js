const Moment = require('moment');
const validate = require('./validate');
const convert = require('./convert');

const stringType = {
  validation: validate.string,
};

const numberType = {
  validation: validate.number,
  /**
   * Convert String to Integer Numbers
   *
   * @param {string} value
   */
  convert: value => parseInt(value, 10),
};

const floatType = {
  validation: validate.float,
  convert: val => {
    if (typeof val === 'string') {
      return val.replace(',', '.');
    }

    return val;
  },
};

const boolType = {
  validation: validate.bool,
  /**
   * Convert string to boolean
   *
   * @param {string} value
   * @returns {boolean}
   */
  convert: value => value === 'true',
};

const datetimeType = {
  validation: validate.string,
};

const dateType = {
  validation: validate.string,
  convert: val => Moment(val).format('YYYY-MM-DD'),
};

const orderType = {
  validation: validate.string,
  convert: convert.orderToFilter,
  default: [['id', 'DESC']],
};

const batchSelType = stringType;

const limitSelType = {
  ...numberType,
  default: 100,
};

const pageSelType = {
  ...numberType,
  default: 1,
};

module.exports = {
  stringType,
  numberType,
  floatType,
  boolType,
  datetimeType,
  dateType,
  orderType,
  batchSelType,
  limitSelType,
  pageSelType,
};
