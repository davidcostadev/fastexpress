const Service = require('../../src/Service');
const { createResourceService: createService } = require('../../src/createService');

jest.mock('../../src/Service', () => ({
  create: jest.fn(),
  list: jest.fn(),
  get: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
}));

describe('createService', () => {
  let Model;
  let configs;
  let req;

  beforeAll(() => {
    Model = 'Model';
    configs = {
      database: 'MyDatabase',
      filters: { one: 'one' },
      form: { two: 'two' },
    };
    req = {
      key: 'value',
    };
  });

  it('should get the default methods', () => {
    const serviceCreated = createService(Model, configs);

    expect(serviceCreated).toHaveProperty('create');
    expect(serviceCreated).toHaveProperty('list');
    expect(serviceCreated).toHaveProperty('get');
    expect(serviceCreated).toHaveProperty('update');
    expect(serviceCreated).toHaveProperty('destroy');

    serviceCreated.create(req);
    serviceCreated.list(req);
    serviceCreated.get(req);
    serviceCreated.update(req);
    serviceCreated.destroy(req);

    const expectConfig = {
      database: 'MyDatabase',
      options: { filters: { one: 'one', two: 'two' } },
      definitions: { two: 'two' },
    };

    expect(Service.create).toBeCalledWith(req, Model, expectConfig);
    expect(Service.list).toBeCalledWith(req, Model, expectConfig);
    expect(Service.get).toBeCalledWith(req, Model, expectConfig);
    expect(Service.update).toBeCalledWith(req, Model, expectConfig);
    expect(Service.destroy).toBeCalledWith(req, Model, expectConfig);
  });

  it('should get with custom methods', () => {
    const another = (reqAnother, model, configsAnother) =>
      Service.get(
        {
          ...reqAnother,
          three: 'three',
        },
        model,
        configsAnother,
      );
    const config = {
      database: 'MyDatabase',
      filters: {},
      form: {},
    };

    const expectConfig = {
      database: 'MyDatabase',
      options: { filters: {} },
      definitions: {},
    };

    const serviceCreated = createService(Model, {
      ...config,
      custom: {
        another,
      },
    });

    expect(serviceCreated).toHaveProperty('another');

    serviceCreated.another(req);

    expect(Service.get).toBeCalledWith(
      {
        ...req,
        three: 'three',
      },
      Model,
      expectConfig,
    );
  });

  it.only('Should get deprecated warn on to inform definitions or options', () => {
    const oldWarn = global.console.warn;
    global.console.warn = jest.fn();

    const serviceCreated = createService(Model, {
      database: 'MyDatabase',
      definitions: { one: 'one' },
      options: {
        filters: {
          two: 'two',
        },
      },
    });

    serviceCreated.get(req);

    expect(Service.get).toBeCalledWith(req, Model, {
      database: 'MyDatabase',
      definitions: { one: 'one' },
      options: { filters: { one: 'one', two: 'two' } },
    });

    expect(global.console.warn).toBeCalledWith(
      'Deprecated: Use just `filters` instead of `options`.',
    );
    expect(global.console.warn).toBeCalledWith(
      'Deprecated: Use just `form` instead of `definitions`.',
    );
    global.console.warn = oldWarn;
  });
});
