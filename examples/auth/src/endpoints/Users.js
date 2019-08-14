const {
  createController,
  createService,
  serviceDefaultProps,
  validate,
} = require('../../../../src');
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

const UserService = createService(
  Users,
  serviceDefaultProps({
    database,
    form,
  }),
);

module.exports = createController(UserService);
