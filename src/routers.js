/**
 * This function create all endpoint of resources
 *
 * @param {string} prefix
 * @param {object} object { router, middleware, controller }
 */
const resources = (prefix, { router, middleware, controller }) => {
  // eslint-disable-next-line no-param-reassign
  middleware = typeof middleware !== 'undefined' ? middleware : [];

  router.get(`${prefix}/`, middleware, controller.list);
  router.post(`${prefix}/`, middleware, controller.create);
  router.get(`${prefix}/:id`, middleware, controller.get);
  router.delete(`${prefix}/:id`, middleware, controller.destroy);
  router.put(`${prefix}/:id`, middleware, controller.update);
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
const resourceList = (url, { custom = [], namespace = defaultNamespace } = {}) => [
  ...[
    controller => `[get] ${controller}`,
    controller => `[post] ${controller}`,
    controller => `[get] ${controller}/:id`,
    controller => `[delete] ${controller}/:id`,
    controller => `[put] ${controller}/:id`,
  ].map(method => method(namespace(url))),
  ...custom,
];

module.exports = {
  resources,
  resourcesAuth,
  namespaceCreator,
  namespaceIndexCreator,
  resourceWithAuth,
  resourceList,
};
