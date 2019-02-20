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
  UserId: {
    validation: validate.number,
  },
};

module.exports = createService(Tasks, serviceDefaultProps({
  database,
  form,
}));
