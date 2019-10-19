const R = require('ramda');

const convertIt = (definition, key, value) =>
  R.has('convert', definition) ? definition.convert(value, key) : value;

const selector = (definitions, query = {}) =>
  R.toPairs(definitions).reduce((acc, [key, definition]) => {
    let newValue;
    if (R.has(key, query)) {
      const value = R.prop(key, query);

      if (definition.validation(value)) {
        newValue = convertIt(definition, key, value);
      } else if (R.has('default', definition)) {
        newValue = definition.default;
      }
    } else if (R.has('default', definition)) {
      newValue = definition.default;
    }

    return newValue
      ? {
          ...acc,
          [key]: newValue,
        }
      : acc;
  }, {});

module.exports = selector;
