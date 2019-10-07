const {
  getType,
  getSeedType,
  getSequelizeType,
  fieldsMigration,
  fieldsResource,
  fieldsModel,
  fieldsSeeders,
  fieldsHandler,
} = require('../../bin/utils');

describe('fieldsHandler', () => {
  expect(fieldsHandler({})).toEqual(null);
  expect(
    fieldsHandler({
      _: ['resource', 'isPaid:boolean', 'age:number'],
      attributes: 'name:string',
    }),
  ).toEqual(['name:string', 'isPaid:boolean', 'age:number']);
});

describe('fieldsSeeders', () => {
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

describe('fieldsMigration', () => {
  expect(fieldsMigration([])).toEqual({
    dependencies: '',
    fields: '{}',
  });
  expect(fieldsMigration(['name:string'])).toEqual({
    fields: 'name: Sequelize.STRING,',
  });
});

describe('fieldsModel', () => {
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

describe('fieldsResource', () => {
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

describe('getType', () => {
  it('should return correct type', () => {
    expect(getType('')).toBe('string');
    expect(getType('integer')).toBe('number');
    expect(getType('number')).toBe('number');
    expect(getType('string')).toBe('string');
    expect(getType('text')).toBe('string');
    expect(getType('boolean')).toBe('bool');
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
  });
});
