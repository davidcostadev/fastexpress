const createController = require('./createController');
const { serviceDefaultProps, createResourceService } = require('./createService');

/**
 * This function will create a controller and service with Model
 *
 * @param {object} Model
 * @param {object} form
 * @param {object} database
 */
const endpoint = (Model, form, database) =>
  createController(
    createResourceService(
      Model,
      serviceDefaultProps({
        database,
        form,
      }),
    ),
  );

module.exports = endpoint;
