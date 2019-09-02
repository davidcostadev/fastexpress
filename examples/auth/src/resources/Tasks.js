const { endpoint, validate } = require('../../../../src');
const database = require('../models');

const { Tasks } = database;

const form = {
  name: {
    validation: validate.string,
  },
  completed: {
    validation: validate.bool,
  },
  UserId: {
    validation: validate.number,
  },
};

module.exports = endpoint(Tasks, {
  database,
  form,
});
