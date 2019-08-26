const createController = require('./createController');
const { serviceDefaultProps, createResourceService } = require('./createService');

/**
 * This function will create a controller and service with Model
 *
 * @param {object} Model
 * @param {object} form
 * @param {object} database
 * @param {Object} filters
 */
const endpoint = (Model, form, database, filters) =>
  createController(
    createResourceService(
      Model,
      serviceDefaultProps({
        database,
        form,
        filters,
      }),
    ),
  );

module.exports = endpoint;
