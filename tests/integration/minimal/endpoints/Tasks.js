const { endpoint, validate } = require('../../../../src');
const database = require('../models');

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
