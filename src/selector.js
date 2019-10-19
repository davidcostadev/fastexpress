const { has, prop, toPairs, not, last, isNil } = require('ramda');

const convertIt = (definition, key, value) =>
  has('convert', definition) ? definition.convert(value, key) : value;

// eslint-disable-next-line consistent-return
const defaultIt = definition => {
  if (has('default', definition)) {
    return definition.default;
  }
};

const filterQueries = (definition, key, query, callback) => {
  if (has(key, query)) {
    return callback(definition, key, prop(key, query));
  }
  return defaultIt(definition);
};

const checkValidation = (definition, key, value) => {
  if (definition.validation(value)) {
    return convertIt(definition, key, value);
  }
  return defaultIt(definition);
};

const selector = (definitions, query = {}) =>
  toPairs(definitions)
    .map(([key, definition]) => [key, filterQueries(definition, key, query, checkValidation)])
    .filter(entry => not(isNil(last(entry))))
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

module.exports = selector;
