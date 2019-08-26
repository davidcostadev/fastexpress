const { createService, serviceDefaultProps, validate, stringFilter } = require('../../../../src');
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

module.exports = createService(
  Tasks,
  serviceDefaultProps({
    database,
    form,
    filters: {
      name: stringFilter,
    },
  }),
);
