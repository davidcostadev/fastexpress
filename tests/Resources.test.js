const Resources = require('../src/Resources');

jest.mock('express', () => {
  const endpoints = [];
  function add(url, one, two) {
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
      endpoints.push([url, body]);
    } else {
      endpoints.push(url);
    }
  }

  return {
    Router() {
      return {
        endpoints,
        get: add,
        post: add,
        delete: add,
        put: add,
      };
    },
  };
});

describe('Resources', () => {
  it('Should create all endpoints with the name of resource', () => {
    const controller = {
      create: () => {},
      get: () => {},
      list: () => {},
      destroy: () => {},
      update: () => {},
    };

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
      '/api/customers/',
      '/api/customers/:id',
      '/api/customers/',
      '/api/customers/:id',
      '/api/customers/:id',
      ['/', { api: { customers } }],
      ['/api/', { customers }],
    ]);
  });
});
