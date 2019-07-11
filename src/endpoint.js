
const createController = require('./createController');
const { serviceDefaultProps, createResourceService } = require('./createService');

const endpoint = (Model, form, database) => createController(createResourceService(
  Model,
  serviceDefaultProps({
    database,
    form,
  }),
));

module.exports = endpoint;
