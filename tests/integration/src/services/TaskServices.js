const { createService, stringFilter, type } = require('../../../../src');
const database = require('../models');

const { Tasks } = database;

const form = {
  name: type.stringType,
  completed: type.boolType,
};

const filters = {
  name: stringFilter,
};

module.exports = createService(Tasks, {
  form,
  filters,
  database,
});
