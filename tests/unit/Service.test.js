const iconv = require('iconv-lite');
const encodings = require('iconv-lite/encodings');
const Service = require('../../src/Service');
const { EXCEPTION_NOT_FOUND, EXCEPTION_UNPROCESSABLE_ENTITY } = require('../../src/lib/errors');

iconv.encodings = encodings;

let reqMock = {
  query: {},
};
let resMock = {
  json: jest.fn(),
};

describe('Service', () => {
  const definitions = {
    id: {
      validation: () => true,
    },
    name: {
      validation: () => true,
    },
  };
  let entity;
  let database;
  let aliasDatabase;

  beforeEach(async () => {
    const status = jest.fn();

    aliasDatabase = {
      AccountFrom: 'Accounts',
    };

    reqMock = {
      query: {},
      params: {},
      body: {},
    };
    resMock = {
      status,
      send: jest.fn(),
      json: jest.fn(),
    };

    status.mockReturnValue(resMock);

    entity = {
      id: 1,
      name: 'David',
    };
    database = {
      Accounts: new (class Accounts {})(),
      Transactions: new (class Transactions {})(),
    };
  });

  describe('list', () => {
    it('default', async () => {
      const modelMock = {
        findAll: jest.fn().mockResolvedValue([entity]),
        findAndCountAll: jest.fn().mockResolvedValue({ count: 1 }),
      };

      const result = await Service.list(reqMock, modelMock, { options: {} });

      expect(modelMock.findAll).toBeCalled();
      expect(modelMock.findAndCountAll).toBeCalled();

      expect(modelMock.findAll.mock.calls).toEqual([
        [
          {
            limit: 100,
            offset: 0,
            order: [['id', 'DESC']],
          },
        ],
      ]);
      expect(modelMock.findAndCountAll.mock.calls).toEqual([[{ where: {} }]]);
      expect(result).toEqual({
        data: [entity],
        pagination: {
          currentPage: 1,
          nextPage: null,
          perPage: 100,
          previousPage: null,
          totalItems: 1,
          totalPages: 1,
        },
      });
    });

    it('with filters and batch', async () => {
      const modelMock = {
        findAll: jest.fn().mockResolvedValue([entity]),
        findAndCountAll: jest.fn().mockResolvedValue({ count: 1 }),
      };

      reqMock.query = {
        id: 1,
        limit: 10,
        page: 2,
        order: 'id.ASC,name.DESC',
        batch: 'AccountFrom,Transactions',
      };
      await Service.list(reqMock, modelMock, {
        options: {
          filters: definitions,
          aliasDatabase,
        },
        database,
      });

      expect(modelMock.findAll.mock.calls).toEqual([
        [
          {
            limit: 10,
            offset: 10,
            order: [['id', 'ASC'], ['name', 'DESC']],
            where: { id: 1 },
            include: [
              {
                as: 'AccountFrom',
                model: new (class Accounts {})(),
              },
              {
                model: new (class Transactions {})(),
              },
            ],
          },
        ],
      ]);
      expect(modelMock.findAndCountAll.mock.calls).toEqual([
        [
          {
            where: { id: 1 },
          },
        ],
      ]);
    });

    it('simulate error', async () => {
      const modelMock = {
        findAll: jest.fn().mockReturnValue(Promise.reject(new Error('Async error'))),
      };

      try {
        const { error } = console;
        console.error = jest.fn();

        await Service.list(reqMock, modelMock, {});

        expect(console.error).toBeCalled();
        console.error = error;
      } catch (e) {
        expect(e.message).toBe(EXCEPTION_NOT_FOUND);
      }
    });
  });

  describe('get', () => {
    it('default', async () => {
      const modelMock = {
        findOne: jest.fn().mockResolvedValue(entity),
      };

      reqMock.params = {
        id: 1,
      };

      const result = await Service.get(reqMock, modelMock, {});

      expect(modelMock.findOne).toBeCalledWith({ where: { id: 1 } });

      expect(result).toEqual(result);
    });

    it('simulate error', async () => {
      const modelMock = {
        findOne: jest.fn().mockReturnValue(Promise.resolve(null)),
      };

      try {
        await Service.get(reqMock, modelMock, {});
      } catch (e) {
        expect(e.message).toBe(EXCEPTION_NOT_FOUND);
      }
    });
  });

  describe('create', () => {
    it('default', async () => {
      const modelMock = {
        create: jest.fn().mockResolvedValue(entity),
      };

      reqMock.body = entity;

      const result = await Service.create(reqMock, modelMock, { definitions });

      expect(modelMock.create.mock.calls).toEqual([[entity]]);

      expect(result).toEqual(result);
    });

    it('simulate error', async () => {
      reqMock.body = {
        name: 'David Costa',
      };

      const modelMock = {
        create: jest.fn().mockReturnValue(Promise.reject(new Error('Async error'))),
      };

      try {
        await Service.create(reqMock, modelMock, { definitions });
      } catch (e) {
        expect(e.message).toBe('Async error');
      }
    });
  });

  describe('update', () => {
    it('default', async () => {
      const modelMock = {
        findByPk: jest.fn().mockResolvedValue({
          ...entity,
          update: jest.fn().mockResolvedValue(entity),
        }),
      };

      reqMock.body = entity;
      reqMock.params = { id: 1 };

      const result = await Service.update(reqMock, modelMock, { definitions });

      expect(modelMock.findByPk.mock.calls).toEqual([[1]]);
      expect(result).toEqual(entity);
    });

    it('update with wrong user', async () => {
      const modelMock = {
        findByPk: () => Promise.resolve(false),
      };

      try {
        await Service.update(reqMock, modelMock, { definitions });
      } catch (e) {
        expect(e.message).toBe(EXCEPTION_NOT_FOUND);
      }
    });

    it('update with corrent user', async () => {
      const modelMock = {
        findByPk: () => true,
        update: () => Promise.reject(new Error('Async error')),
      };

      try {
        await Service.update(reqMock, modelMock, { definitions });
      } catch (e) {
        expect(e.message).toBe(EXCEPTION_UNPROCESSABLE_ENTITY);
      }
    });
  });

  describe('destroy', () => {
    it('default', async () => {
      const modelMock = {
        destroy: jest.fn(),
      };

      reqMock.params = { id: 1 };

      const result = await Service.destroy(reqMock, modelMock);

      expect(modelMock.destroy.mock.calls).toEqual([[{ where: { id: 1 } }]]);
      expect(result).toEqual(true);
    });

    it('simulate error', async () => {
      const modelMock = {
        destroy: jest.fn().mockReturnValue(Promise.reject(new Error('Async error'))),
      };

      try {
        await Service.destroy(reqMock, modelMock, { definitions });
      } catch (e) {
        expect(e.message).toBe(EXCEPTION_UNPROCESSABLE_ENTITY);
      }
    });
  });
});
