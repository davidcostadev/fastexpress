import { createService, Service } from '../../src/index';

jest.mock('../../src/service/Service', () => ({
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
      definitions: { one: 'one'},
      options: { two: 'two'},
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

    expect(Service.create).toBeCalledWith(req, Model, configs);
    expect(Service.list).toBeCalledWith(req, Model, configs);
    expect(Service.get).toBeCalledWith(req, Model, configs);
    expect(Service.update).toBeCalledWith(req, Model, configs);
    expect(Service.destroy).toBeCalledWith(req, Model, configs);
  });

  it('should get with custom methods', () => {
    const another = (req, model, configs) => Service.get({
      ...req,
      three: 'three',
    }, model, configs);

    const serviceCreated = createService(Model, {
      ...configs,
      custom: {
        another,
      },
    });

    expect(serviceCreated).toHaveProperty('another');

    serviceCreated.another(req);

    expect(Service.get).toBeCalledWith({
      ...req,
      three: 'three',
    }, Model, configs);
  });
});
