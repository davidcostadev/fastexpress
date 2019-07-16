const Moment = require('moment');
const validate = require('./validate');
const convert = require('./convert');

const stringType = {
  validation: validate.string,
};

const numberType = {
  validation: validate.number,
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
