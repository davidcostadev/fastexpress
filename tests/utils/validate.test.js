import { validate } from '../../src';

describe('validade function', () => {
  it('number', () => {
    expect(validate.number(null)).toBe(false);
    expect(validate.number(undefined)).toBe(false);
    expect(validate.number(NaN)).toBe(false);
    expect(validate.number(0)).toBe(true);
    expect(validate.number(1)).toBe(true);
    expect(validate.number('1')).toBe(true);
  });

  it('string', () => {
    expect(validate.string(null)).toBe(false);
    expect(validate.string(undefined)).toBe(false);
    expect(validate.string(NaN)).toBe(false);
    expect(validate.string(0)).toBe(false);
    expect(validate.string(1)).toBe(false);
    expect(validate.string('')).toBe(false);
    expect(validate.string('1')).toBe(true);
  });
});
