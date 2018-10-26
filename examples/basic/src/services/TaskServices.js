const { createService, serviceDefaultProps, validate } = require('fastexpress');
const database = require('../models');

const { Tasks } = database;

const form = {
  name: {
    validation: validate.string,
  },
  completed: {
    validation: validate.bool,
  },
}

module.exports = createService(Tasks, serviceDefaultProps({
  database,
  form,
}));
