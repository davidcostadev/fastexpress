'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cryptPassword = exports.clearData = exports.getModelAlias = exports.listDefaultOptions = undefined;

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const listDefaultOptions = exports.listDefaultOptions = {
  where: {},
  filter: null,
  fields: [],
  aliasDatabase: {}
};

const getModelAlias = exports.getModelAlias = (aliasDatabase, db) => model => {
  const aliasList = Object.keys(aliasDatabase);

  if (aliasList.includes(model)) {
    const alias = aliasList[aliasList.indexOf(model)];

    return {
      model: db[aliasDatabase[alias]],
      as: model
    };
  }

  return {
    model: db[model]
  };
};

/* eslint no-use-before-define: "off" */
const clearItem = scheme => item => {
  const newItem = {};

  scheme.forEach(field => {
    if (item === null) {
      newItem[field] = null;
    } else if (typeof field === 'string') {
      newItem[field] = item[field];
    } else {
      Object.keys(field).forEach(key => {
        if (typeof item[key] !== 'undefined') {
          newItem[key] = clearData(item[key], field[key]);
        }
      });
    }
  });

  return newItem;
};

const clearData = exports.clearData = (data, scheme) => {
  if (Array.isArray(data)) {
    return data.map(clearItem(scheme));
  }

  return clearItem(scheme)(data);
};

/* eslint no-param-reassign: "off" */
/* eslint no-underscore-dangle: "off" */
const cryptPassword = exports.cryptPassword = (user, bcryptSalt = 2) => {
  if (user.password !== user._previousDataValues.password) {
    return _bcrypt2.default.hash(user.password, _bcrypt2.default.genSaltSync(bcryptSalt)).then(hash => {
      user.password = hash;
    });
  }

  return null;
};