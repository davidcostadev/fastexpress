const routeCreator = require('../../src/routeCreator');

jest.mock('express');

describe('routeCreator', () => {
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

  it('Should create all route with default actions', () => {
    routeCreator('model', {
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
    expect(router.get.mock.calls[1][2]).toEqual(controller.get);
    expect(router.post.mock.calls[0][2]).toEqual(controller.create);
    expect(router.delete.mock.calls[0][2]).toEqual(controller.destroy);
    expect(router.put.mock.calls[0][2]).toEqual(controller.update);
  });

  it('Should use only create and get actions', () => {
    routeCreator('model', {
      router,
      controller,
      only: ['create', 'get'],
    });

    expect(router.get).toBeCalledTimes(1);
    expect(router.post).toBeCalledTimes(1);
    expect(router.delete).not.toBeCalled();
    expect(router.put).not.toBeCalled();
  });

  it('Should create routers with all actions except the destroy action', () => {
    routeCreator('model', {
      router,
      controller,
      except: ['destroy'],
    });

    expect(router.get).toBeCalledTimes(2);
    expect(router.post).toBeCalledTimes(1);
    expect(router.delete).not.toBeCalled();
    expect(router.put).toBeCalledTimes(1);
  });

  it('Should create routes with except and only actions', () => {
    routeCreator('model', {
      router,
      controller,
      only: ['get', 'post'],
      except: ['post'],
    });

    expect(router.get).toBeCalledTimes(1);
    expect(router.post).not.toBeCalled();
    expect(router.delete).not.toBeCalled();
    expect(router.put).not.toBeCalled();
  });
});
