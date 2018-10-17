import {
  resources,
  resourcesAuth,
  namespaceIndexCreator,
  resourceList,
  resourceWithAuth,
} from '../src/index.js';

jest.mock('express');

describe('routers', () => {
  let router;
  let controller;

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
  });

  afterEach(() => {
    // mockRestore
  });

  describe('resourceWithAuth', () => {
    it(' should create a routes with routers resources', () => {
      resourceWithAuth('url1', controller, {
        router,
        middleware: {},
      });
      expect(router.get.mock.calls[0][0]).toEqual('/api/v1/url1/');
      expect(router.post.mock.calls[0][0]).toEqual('/api/v1/url1/');
      expect(router.get.mock.calls[1][0]).toEqual('/api/v1/url1/:id');
      expect(router.delete.mock.calls[0][0]).toEqual('/api/v1/url1/:id');
      expect(router.put.mock.calls[0][0]).toEqual('/api/v1/url1/:id');

      expect(router.get.mock.calls[0][2]).toEqual(controller.list);
      expect(router.post.mock.calls[0][2]).toEqual(controller.create);
      expect(router.get.mock.calls[1][2]).toEqual(controller.get);
      expect(router.delete.mock.calls[0][2]).toEqual(controller.destroy);
      expect(router.put.mock.calls[0][2]).toEqual(controller.update);
    });
  });

  describe('resourceList', () => {
    it(' should create a array of object', () => {
      expect(resourceList('url')).toEqual([
        '[get] /api/v1/url',
        '[post] /api/v1/url',
        '[get] /api/v1/url/:id',
        '[delete] /api/v1/url/:id',
        '[put] /api/v1/url/:id',
      ]);
    });

    it(' should create a array of object with custom', () => {
      expect(resourceList('url', [
        '[get] /api/v1/custom',
      ])).toEqual([
        '[get] /api/v1/url',
        '[post] /api/v1/url',
        '[get] /api/v1/url/:id',
        '[delete] /api/v1/url/:id',
        '[put] /api/v1/url/:id',
        '[get] /api/v1/custom',
      ]);
    });
  });

  describe('namespaceIndexCreator', () => {
    it('should create a object with urls', () => {
      expect(namespaceIndexCreator({
        legal: 1,
      })).toEqual({
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

      expect(router.get.mock.calls[0][1]).toEqual(controller.list);
      expect(router.post.mock.calls[0][1]).toEqual(controller.create);
      expect(router.get.mock.calls[1][1]).toEqual(controller.get);
      expect(router.delete.mock.calls[0][1]).toEqual(controller.destroy);
      expect(router.put.mock.calls[0][1]).toEqual(controller.update);
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
    });
  });
});
