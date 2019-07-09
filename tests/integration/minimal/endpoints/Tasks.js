const { createController } = require('../../../../src');
const { createService, serviceDefaultProps, validate } = require('../../../../src');
const database = require('../models');

const { Tasks } = database;

const form = {
  name: {
    validation: validate.string,
  },
  completed: {
    validation: validate.bool,
  },
};

const TaskService = createService(Tasks, serviceDefaultProps({
  database,
  form,
}));

module.exports = createController(TaskService);
