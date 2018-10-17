import R from 'ramda';

export const string = R.compose(Boolean, R.length);

export const number = num => Number.isInteger(parseInt(num, 10));

export const float = num => !Number.isNaN(parseFloat(num));

export const bool = val => typeof Boolean(val) === 'boolean';
