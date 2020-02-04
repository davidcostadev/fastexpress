const { endpoint, validate } = require('fastexpress');
const database = require('../models');

const { Users } = database;

const form = {
  name: {
    validation: validate.string,
  },
  email: {
    validation: validate.string,
  },
  password: {
    validation: validate.string,
  },
};

module.exports = endpoint(Users, form, database, form);
