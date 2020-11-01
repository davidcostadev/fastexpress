/* eslint-disable no-throw-literal */
const {
  getType,
  getSeedType,
  getSequelizeType,
  fieldsMigration,
  fieldsResource,
  fieldsModel,
  fieldsSeeders,
  fieldsHandler,
  handlerError,
} = require('../../bin/utils');

describe('handlerError', () => {
  it('Should handlerError console error -17', async () => {
    const simulateError = async () => {
      throw { errno: -17, message: 'Some message' };
    };
    const oldError = global.console.error;
    global.console.error = jest.fn();

    await handlerError(simulateError)({});

    expect(global.console.error).toBeCalledWith('Some message');

    global.console.error = oldError;
  });

  it('Should handlerError console the error as default', async () => {
    const simulateError = async () => {
      throw new Error('Some message');
    };
    const oldError = global.console.error;
    global.console.error = jest.fn();

    await handlerError(simulateError)({});

    expect(global.console.error).toBeCalledWith(new Error('Some message'));

    global.console.error = oldError;
  });
});

it('fieldsHandler', () => {
  expect(fieldsHandler({})).toEqual(null);
  expect(
    fieldsHandler({
      _: ['resource', 'isPaid:boolean', 'age:number', 'requestAt:datetime'],
      attributes: 'name:string',
    }),
  ).toEqual(['name:string', 'isPaid:boolean', 'age:number', 'requestAt:datetime']);
});

it('fieldsSeeders', () => {
  expect(fieldsSeeders([])).toEqual({
    dependencies: '',
    fields: '{}',
  });
  expect(fieldsSeeders(['name:string'])).toEqual({
    dependencies: `const faker = require('faker');

`,
    fields: `name: faker.lorem.words(),
        `,
  });
});

it('fieldsMigration', () => {
  expect(fieldsMigration([])).toEqual({
    dependencies: '',
    fields: '{}',
  });
  expect(fieldsMigration(['name:string'])).toEqual({
    fields: 'name: Sequelize.STRING,',
  });
});

it('fieldsModel', () => {
  expect(fieldsModel([])).toEqual({
    dependencies: '',
    fields: '{}',
  });
  expect(fieldsModel(['name:string'])).toEqual({
    fields: `{
      name: DataTypes.STRING
    }`,
  });
});

it('fieldsResource', () => {
  expect(fieldsResource([])).toEqual({
    dependencies: '',
    fields: '{}',
  });
  expect(fieldsResource(['name:string'])).toEqual({
    dependencies: ', validate',
    fields: `{
    name: {
      validation: validate.string,
    }
  }`,
  });
});

it('fieldsResource with datetime', () => {
  expect(fieldsResource([])).toEqual({
    dependencies: '',
    fields: '{}',
  });
  expect(fieldsResource(['requestAt:datetime'])).toEqual({
    dependencies: ', validate',
    fields: `{
    requestAt: {
      validation: validate.datetime,
    }
  }`,
  });
});

describe('getType', () => {
  it('should return correct type', () => {
    expect(getType('')).toBe('string');
    expect(getType('integer')).toBe('number');
    expect(getType('number')).toBe('number');
    expect(getType('string')).toBe('string');
    expect(getType('text')).toBe('string');
    expect(getType('boolean')).toBe('bool');
    expect(getType('datetime')).toBe('datetime');
  });
});

describe('getSequelizeType', () => {
  it('should return correct type', () => {
    expect(getSequelizeType('')).toBe('STRING');
    expect(getSequelizeType('integer')).toBe('INTEGER');
    expect(getSequelizeType('number')).toBe('INTEGER');
    expect(getSequelizeType('string')).toBe('STRING');
    expect(getSequelizeType('text')).toBe('TEXT');
    expect(getSequelizeType('boolean')).toBe('BOOLEAN');
    expect(getSequelizeType('datetime')).toBe('DATE');
  });
});

describe('getSeedType', () => {
  it('should return correct type', () => {
    expect(getSeedType('')).toBe('lorem.words()');
    expect(getSeedType('integer')).toBe('random.number()');
    expect(getSeedType('number')).toBe('random.number()');
    expect(getSeedType('string')).toBe('lorem.words()');
    expect(getSeedType('text')).toBe('lorem.sentences()');
    expect(getSeedType('boolean')).toBe('random.boolean()');
    expect(getSeedType('datetime')).toBe('date.past()');
  });
});
