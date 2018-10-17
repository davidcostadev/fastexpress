'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const selector = (definitions, query = {}) => {
  const select = {};

  Object.keys(definitions).forEach(key => {
    if (typeof query[key] !== 'undefined') {
      if (definitions[key].validation(query[key])) {
        if (typeof definitions[key].convert !== 'undefined') {
          select[key] = definitions[key].convert(query[key], key);
        } else {
          select[key] = query[key];
        }
      } else if (typeof definitions[key].default !== 'undefined') {
        select[key] = definitions[key].default;
      }
    } else if (typeof definitions[key].default !== 'undefined') {
      select[key] = definitions[key].default;
    }
  });

  return select;
};

exports.default = selector;