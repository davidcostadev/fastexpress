const createController = require('./createController');
const { createResourceService } = require('./createService');

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
    createResourceService(Model, {
      filters,
      form,
      database,
    }),
  );

module.exports = endpoint;
