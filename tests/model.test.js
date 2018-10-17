import bcrypt from 'bcrypt';
import { cryptPassword, getModelAlias, clearData } from '../src/index.js';

describe('model', () => {
  describe('clearData should work', () => {
    let data;
    let scheme;

    beforeEach(() => {
      data = {
        id: 1,
        name: 'name',
        more: 'more',
      };
      scheme = [
        'id',
        'name',
      ];
    });

    it('with array', () => {
      expect(clearData([data], scheme)).toEqual([{
        id: 1,
        name: 'name',
      }]);
    });
    it('with object', () => {
      expect(clearData(data, scheme)).toEqual({
        id: 1,
        name: 'name',
      });
    });
  });

  describe('getModelAlias should', () => {
    it('without alias', async () => {
      const Model = {
        Users: 'Users',
      };

      const result = getModelAlias({}, Model)('Users');

      expect(result).toEqual({
        model: 'Users',
      });
    });

    it('with alias', async () => {
      const Model = {
        Accounts: 'Accounts',
      };

      const result = getModelAlias({
        AccountFrom: 'Accounts',
        AccountTo: 'Accounts',
      }, Model)('AccountFrom');

      expect(result).toEqual({
        as: 'AccountFrom',
        model: 'Accounts',
      });
    });
  });

  describe('cryptPassword should', () => {
    it('sucessful', async () => {
      const user = {
        password: '123',
        _previousDataValues: {
          password: '1234',
        },
      };

      await cryptPassword(user);

      expect(bcrypt.compareSync('123', user.password)).toBe(true);
    });
  });
});
