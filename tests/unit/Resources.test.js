const { Router } = require('express');
const Resources = require('../../src/Resources');

jest.mock('express', () => ({
  Router: jest.fn(),
}));

describe('Resources', () => {
  beforeEach(() => {
    const endpoints = [];
    const add = verb => (url, one, two) => {
      let body;
      const res = {
        send(data) {
          body = data;
        },
      };
      if (typeof one === 'function') {
        one(null, res);
      } else {
        two(null, res);
      }
      if (body) {
        endpoints.push([`[${verb}] ${url}`, body]);
      } else {
        endpoints.push(`[${verb}] ${url}`);
      }
    };

    Router.mockImplementationOnce(() => ({
      endpoints,
      get: add('get'),
      post: add('post'),
      delete: add('delete'),
      put: add('put'),
    }));
  });

  const controller = {
    create: () => {},
    get: () => {},
    list: () => {},
    destroy: () => {},
    update: () => {},
  };

  it('Should create all endpoints with the name of resource', () => {
    const resources = new Resources({
      namespace: '/api/',
    }).add('customers', controller);

    resources.setIndexResponse();

    const customers = [
      '[get] /api/customers',
      '[post] /api/customers',
      '[get] /api/customers/:id',
      '[delete] /api/customers/:id',
      '[put] /api/customers/:id',
    ];

    expect(resources.router.endpoints).toEqual([
      '[get] /api/customers/',
      '[post] /api/customers/',
      '[get] /api/customers/:id',
      '[delete] /api/customers/:id',
      '[put] /api/customers/:id',
      ['[get] /', { api: { customers } }],
      ['[get] /api/', { customers }],
    ]);
  });

  it('Should create only get and list endpoints', () => {
    const resources = new Resources({
      namespace: '/api/',
    }).add('customers', controller, { only: ['list', 'get'] });

    resources.setIndexResponse();

    const customers = ['[get] /api/customers', '[get] /api/customers/:id'];

    expect(resources.router.endpoints).toEqual([
      '[get] /api/customers/',
      '[get] /api/customers/:id',
      ['[get] /', { api: { customers } }],
      ['[get] /api/', { customers }],
    ]);
  });
});
