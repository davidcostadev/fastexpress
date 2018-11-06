import Moment from 'moment';
import * as validate from './validate';
import * as convert from './convert';

export const stringType = {
  validation: validate.string,
};

export const numberType = {
  validation: validate.number,
};

export const floatType = {
  validation: validate.float,
  convert: (val) => {
    if (typeof val === 'string') {
      return val.replace(',', '.');
    }

    return val;
  },
};

export const boolType = {
  validation: validate.bool,
};

export const datetimeType = {
  validation: validate.string,
};

export const dateType = {
  validation: validate.string,
  convert: val => Moment(val).format('YYYY-MM-DD'),
};

export const orderType = {
  validation: validate.string,
  convert: convert.orderToFilter,
  default: [['id', 'DESC']],
};

export const nameSelType = stringType;

export const emailSelType = stringType;

export const passwordSelType = stringType;

export const enabledSelType = boolType;

export const valueSelType = floatType;

export const userIdSelType = numberType;

export const accountIdSelType = numberType;

export const categoryIdSelType = numberType;

export const accountFromIdSelType = numberType;

export const typeSelType = stringType;

export const accountToIdSelType = numberType;

export const transferDateSelType = stringType;

export const transactionDateSelType = dateType;

export const isPaidSelType = boolType;

export const batchSelType = stringType;

export const createdAtSelType = datetimeType;

export const updatedAtSelType = datetimeType;

export const limitSelType = {
  ...numberType,
  default: 100,
};

export const pageSelType = {
  ...numberType,
  default: 1,
};
