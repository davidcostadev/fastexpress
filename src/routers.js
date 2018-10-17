// import config from '../../config/envs';

const config = {
  NAMESPACE: '/api/v1/'
}

export const resources = (prefix, { router, controller }) => {
  router.get(`${prefix}/`, controller.list);
  router.post(`${prefix}/`, controller.create);
  router.get(`${prefix}/:id`, controller.get);
  router.delete(`${prefix}/:id`, controller.destroy);
  router.put(`${prefix}/:id`, controller.update);
};

export const resourcesAuth = (prefix, { router, middleware, controller }) => {
  router.get(`${prefix}/`, middleware, controller.list);
  router.post(`${prefix}/`, middleware, controller.create);
  router.get(`${prefix}/:id`, middleware, controller.get);
  router.delete(`${prefix}/:id`, middleware, controller.destroy);
  router.put(`${prefix}/:id`, middleware, controller.update);
};

export const namespace = url => `${config.NAMESPACE}${url}`;

// config.NAMESPACE = '/api/v1/

export const namespaceIndexCreator = urls => config.NAMESPACE
  .split('/')
  .filter(word => !!word)
  .reduceRight((pre, cur) => ({
    [cur]: pre,
  }), urls);

export const resourceWithAuth = (url, controller, { router, middleware }) => (
  resourcesAuth(namespace(url), {
    controller,
    router,
    middleware,
  })
);

export const resourceList = (url, custom = []) => ([
  ...[
    controller => (`[get] /api/v1/${controller}`),
    controller => (`[post] /api/v1/${controller}`),
    controller => (`[get] /api/v1/${controller}/:id`),
    controller => (`[delete] /api/v1/${controller}/:id`),
    controller => (`[put] /api/v1/${controller}/:id`),
  ].map(method => method(url)),
  ...custom,
]);