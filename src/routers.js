const getAllowedActions = require('./lib/getAllowedActions');
const { ACTIONS } = require('./definitions');
const routeCreator = require('./routeCreator');

/**
 * This function create all endpoint of resources
 *
 * @deprecated
 *
 * @param {string} prefix
 * @param {object} object { router, middleware, controller }
 */
const resources = (prefix, { router, middleware, controller, only = ACTIONS } = {}) => {
  // eslint-disable-next-line no-console
  console.warn('Deprecated: Use `routeCreator` instead of `resources`.');

  routeCreator(prefix, { router, middleware, controller, only });
};

/**
 * @deprecated
 *
 * @param {string} prefix
 * @param {object} object { router, middleware, controller }
 */
const resourcesAuth = (prefix, { router, middleware, controller }) => {
  // eslint-disable-next-line no-console
  console.warn('Deprecated: Use `resources` instead of `resourcesAuth`.');

  resources(prefix, { router, middleware, controller });
};

/**
 * Functor
 *
 * @param {string} [namespace='/']
 *
 * @return {string}
 */
const namespaceCreator = (namespace = '/') => (url = '') => `${namespace}${url}`;

/**
 * Functor to create a index response
 *
 * @param {string} namespace
 */
const namespaceIndexCreator = namespace => urls =>
  namespace()
    .split('/')
    .filter(word => !!word)
    .reduceRight(
      (pre, cur) => ({
        [cur]: pre,
      }),
      urls,
    );

/**
 * Add a root path
 *
 * @param {string} url
 */
const defaultNamespace = url => `/${url}`;

/**
 * @deprecated
 *
 * @param {string} url
 * @param {object} controller
 * @param {object} { router, middleware, namespace = defaultNamespace }
 * @returns
 */
const resourceWithAuth = (
  url,
  controller,
  { router, middleware, namespace = defaultNamespace },
) => {
  // eslint-disable-next-line no-console
  console.warn('Deprecated: Use `resources` instead of `resourceWithAuth`.');

  return resourcesAuth(namespace(url), {
    router,
    middleware,
    controller,
  });
};

/**
 * Create the list of all endpoints of the one resource
 *
 * @param {string} url
 * @param {object} [{ custom = [], namespace = defaultNamespace }={}]
 */
const resourceList = (resource, { custom = [], namespace = defaultNamespace } = {}) => {
  const endpointsActions = {
    create: controller => `[post] ${controller}`,
    get: controller => `[get] ${controller}/:id`,
    list: controller => `[get] ${controller}`,
    destroy: controller => `[delete] ${controller}/:id`,
    update: controller => `[put] ${controller}/:id`,
  };

  let url;
  let allowedActions;
  if (typeof resource === 'string') {
    url = resource;
    allowedActions = ACTIONS;
  } else {
    url = resource.endpoint;
    allowedActions = getAllowedActions(resource.except, resource.only);
  }

  return [
    ...allowedActions.map(action => endpointsActions[action]).map(method => method(namespace(url))),
    ...custom,
  ];
};

module.exports = {
  resources,
  resourcesAuth,
  namespaceCreator,
  namespaceIndexCreator,
  resourceWithAuth,
  resourceList,
};
