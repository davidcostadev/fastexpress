const { createService, serviceDefaultProps, stringFilter, type } = require('../../../../src');
const database = require('../models');

const { Tasks } = database;

const form = {
  name: type.stringType,
  completed: type.boolType,
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
