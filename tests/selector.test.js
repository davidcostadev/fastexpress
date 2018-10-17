import { selector, validate } from '../src/index.js';

it('selector with a convert config', () => {
  const query = {
    id: '1',
  };
  const fieldsConfig = {
    id: {
      validation: validate.number,
      convert: x => parseInt(x, 10),
    },
  };

  expect(selector(fieldsConfig, query)).toEqual({ id: 1 });
});

it('should match object', () => {
  const queryOne = {};
  const queryTwo = {
    name: 'David',
  };
  const queryThree = {
    limit: 50,
    name: '',
  };

  const fieldsConfig = {
    name: {
      validation: validate.string,
    },
    limit: {
      validation: validate.number,
      default: 10,
    },
  };

  expect(selector(fieldsConfig, queryOne)).toEqual({ limit: 10 });
  expect(selector(fieldsConfig, queryTwo)).toEqual({ limit: 10, name: 'David' });
  expect(selector(fieldsConfig, queryThree)).toEqual({ limit: 50 });
});

it('wrong value on validation', () => {
  const query = {
    limit: 'asdsa',
  };
  const config = {
    limit: {
      validation: validate.number,
      default: 10,
    },
  };
  expect(selector(config, query)).toEqual({ limit: 10 });
});

it('with any thing on query params', () => {
  const config = {
    limit: {
      default: 10,
    },
  };
  expect(selector(config)).toEqual({ limit: 10 });
});
