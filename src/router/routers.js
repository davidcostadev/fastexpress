import { ACTIONS, URL_ACTIONS } from '../utils/definitions';


export const resources = (prefix, { router, controller, only = ACTIONS }) => {
  only.forEach((actionOnly) => {
    URL_ACTIONS.forEach(([method, action, url]) => {
      if (actionOnly === action) {
        router[method](url(prefix), controller[action]);
      }
    })
  })
};

export const resourcesAuth = (prefix, { router, middleware, controller }) => {
  router.get(`${prefix}/`, middleware, controller.list);
  router.post(`${prefix}/`, middleware, controller.create);
  router.get(`${prefix}/:id`, middleware, controller.get);
  router.delete(`${prefix}/:id`, middleware, controller.destroy);
  router.put(`${prefix}/:id`, middleware, controller.update);
};

export const namespaceCreator = (namespace = '/') => (url = '') => `${namespace}${url}`;


export const namespaceIndexCreator = namespace => urls => namespace()
  .split('/')
  .filter(word => !!word)
  .reduceRight((pre, cur) => ({
    [cur]: pre,
  }), urls);

const defaultNamespace = (url) => `/${url}`;


export const resourceWithAuth = (url, controller, { router, middleware, namespace = defaultNamespace }) => (
  resourcesAuth(namespace(url), {
    controller,
    router,
    middleware,
  })
);

export const resourceList = (url, { custom = [], namespace = defaultNamespace } = {}) => ([
  ...[
    controller => (`[get] ${controller}`),
    controller => (`[post] ${controller}`),
    controller => (`[get] ${controller}/:id`),
    controller => (`[delete] ${controller}/:id`),
    controller => (`[put] ${controller}/:id`),
  ].map(method => method(namespace(url))),
  ...custom,
]);
