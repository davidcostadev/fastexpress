const database = require('../models');
const { endpoint, validate } = require('../../../../src');

const { Tasks: Model } = database;

module.exports = endpoint(
  Model,
  {
    name: {
      validation: validate.string,
    },
    completed: {
      validation: validate.bool,
    },
  },
  database,
);
