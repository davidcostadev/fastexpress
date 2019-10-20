const { without } = require('ramda');
const { ACTIONS } = require('./definitions');

/**
 * This function create all endpoint of resources
 *
 * @param {string} prefix
 * @param {object} object { router, middleware, controller }
 */
function routeCreator(
  prefix,
  { router, middleware, controller, except = [], only = ACTIONS } = {},
) {
  // eslint-disable-next-line no-param-reassign
  middleware = typeof middleware !== 'undefined' ? middleware : [];

  const allowedActions = without(except, only);

  allowedActions.forEach(action => {
    switch (action) {
      case 'create':
        router.post(`${prefix}/`, middleware, controller.create);
        break;
      case 'list':
        router.get(`${prefix}/`, middleware, controller.list);
        break;
      case 'get':
        router.get(`${prefix}/:id`, middleware, controller.get);
        break;
      case 'destroy':
        router.delete(`${prefix}/:id`, middleware, controller.destroy);
        break;
      case 'update':
        router.put(`${prefix}/:id`, middleware, controller.update);
        break;
      default:
        throw new Error(`Invalid action '${action}'`);
    }
  });
}

module.exports = routeCreator;
