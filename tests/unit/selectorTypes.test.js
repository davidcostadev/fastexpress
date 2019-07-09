const { dateType } = require('../../src/selectorTypes');

describe('SelectorTypes', () => {
  it('Should convert ISO to database format', () => {
    expect(dateType.convert('2019-07-30T17:24:07.780Z')).toBe('2019-07-30');
  });
});
