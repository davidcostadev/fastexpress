const { getType, getSeedType, getSequelizeType } = require('../../bin/utils');

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
