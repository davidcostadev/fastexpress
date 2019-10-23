const {
  resources,
  resourcesAuth,
  namespaceIndexCreator,
  resourceList,
  resourceWithAuth,
  namespaceCreator,
} = require('../../src/routers');

jest.mock('express');

describe('routers', () => {
  let router;
  let controller;
  let warnOld;

  beforeEach(() => {
    router = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    };
    controller = {
      list: jest.fn(),
      create: jest.fn(),
      get: jest.fn(),
      destroy: jest.fn(),
      update: jest.fn(),
    };

    warnOld = global.console.warn;
    global.console.warn = jest.fn();
  });

  afterEach(() => {
    global.console.warn = warnOld;
  });

  describe('resourceWithAuth', () => {
    it(' should create a routes with routers resources', () => {
      const namespace = namespaceCreator('/namespace/');

      function checkSomething() {}

      const middleware = [checkSomething];

      resourceWithAuth('url1', controller, {
        router,
        middleware,
        namespace,
      });

      expect(router.get).toBeCalledTimes(2);
      expect(router.get).toBeCalledWith('/namespace/url1/', middleware, controller.list);
      expect(router.get).toBeCalledWith('/namespace/url1/:id', middleware, controller.get);
      expect(router.post).toBeCalledWith('/namespace/url1/', middleware, controller.create);
      expect(router.delete).toBeCalledWith('/namespace/url1/:id', middleware, controller.destroy);
      expect(router.put).toBeCalledWith('/namespace/url1/:id', middleware, controller.update);
      expect(global.console.warn).toBeCalledWith(
        'Deprecated: Use `resources` instead of `resourcesAuth`.',
      );
    });
  });

  describe('resourceList', () => {
    it(' should create a array of object', () => {
      expect(resourceList('url')).toEqual([
        '[get] /url',
        '[post] /url',
        '[get] /url/:id',
        '[delete] /url/:id',
        '[put] /url/:id',
      ]);
    });

    it(' should create a array of object with custom', () => {
      expect(
        resourceList('url', {
          custom: ['[get] /custom'],
        }),
      ).toEqual([
        '[get] /url',
        '[post] /url',
        '[get] /url/:id',
        '[delete] /url/:id',
        '[put] /url/:id',
        '[get] /custom',
      ]);
    });

    it(' should create a array of object with namespace', () => {
      expect(
        resourceList('url', {
          namespace: namespaceCreator('/namespace/'),
        }),
      ).toEqual([
        '[get] /namespace/url',
        '[post] /namespace/url',
        '[get] /namespace/url/:id',
        '[delete] /namespace/url/:id',
        '[put] /namespace/url/:id',
      ]);
    });
  });

  describe('namespaceIndexCreator', () => {
    it('should create a object with urls', () => {
      expect(
        namespaceIndexCreator(namespaceCreator('/api/v1/'))({
          legal: 1,
        }),
      ).toEqual({
        api: {
          v1: {
            legal: 1,
          },
        },
      });
    });
  });

  describe('resources function should', () => {
    it('works', () => {
      resources('model', {
        router,
        controller,
      });

      expect(router.get.mock.calls[0][0]).toEqual('model/');
      expect(router.post.mock.calls[0][0]).toEqual('model/');
      expect(router.get.mock.calls[1][0]).toEqual('model/:id');
      expect(router.delete.mock.calls[0][0]).toEqual('model/:id');
      expect(router.put.mock.calls[0][0]).toEqual('model/:id');

      expect(router.get.mock.calls[0][1]).toEqual([]);
      expect(router.post.mock.calls[0][1]).toEqual([]);
      expect(router.get.mock.calls[1][1]).toEqual([]);
      expect(router.delete.mock.calls[0][1]).toEqual([]);
      expect(router.put.mock.calls[0][1]).toEqual([]);

      expect(router.get.mock.calls[0][2]).toEqual(controller.list);
      expect(router.post.mock.calls[0][2]).toEqual(controller.create);
      expect(router.get.mock.calls[1][2]).toEqual(controller.get);
      expect(router.delete.mock.calls[0][2]).toEqual(controller.destroy);
      expect(router.put.mock.calls[0][2]).toEqual(controller.update);
    });

    it('should use only create and get actions', () => {
      resources('model', {
        router,
        controller,
        only: ['create', 'get'],
      });

      expect(router.get).toBeCalledTimes(1);
      expect(router.post).toBeCalledTimes(1);
      expect(router.delete).not.toBeCalled();
      expect(router.put).not.toBeCalled();
    });
  });

  describe('resourcesAuth function should', () => {
    it('with middleware', () => {
      const middleware = jest.fn();

      resourcesAuth('model', {
        router,
        controller,
        middleware,
      });

      expect(router.get.mock.calls[0][0]).toEqual('model/');
      expect(router.post.mock.calls[0][0]).toEqual('model/');
      expect(router.get.mock.calls[1][0]).toEqual('model/:id');
      expect(router.delete.mock.calls[0][0]).toEqual('model/:id');
      expect(router.put.mock.calls[0][0]).toEqual('model/:id');

      expect(router.get.mock.calls[0][1]).toEqual(middleware);
      expect(router.post.mock.calls[0][1]).toEqual(middleware);
      expect(router.get.mock.calls[1][1]).toEqual(middleware);
      expect(router.delete.mock.calls[0][1]).toEqual(middleware);
      expect(router.put.mock.calls[0][1]).toEqual(middleware);

      expect(router.get.mock.calls[0][2]).toEqual(controller.list);
      expect(router.post.mock.calls[0][2]).toEqual(controller.create);
      expect(router.get.mock.calls[1][2]).toEqual(controller.get);
      expect(router.delete.mock.calls[0][2]).toEqual(controller.destroy);
      expect(router.put.mock.calls[0][2]).toEqual(controller.update);

      expect(global.console.warn).toBeCalledWith(
        'Deprecated: Use `resources` instead of `resourcesAuth`.',
      );
    });
  });
});
