import { dateFilter, orderToFilter } from '../source/index.js';

describe('converts', () => {
  describe('dateFilter', () => {
    it('.validate', () => {
      expect(dateFilter.validation('any')).toBe(true);
    });

    describe('.convert with', () => {
      it('more than one date', () => {
        const start = '2018-07-24T20:09:10.971Z';
        const end = '2018-07-24T20:09:10.971Z';

        const date = [start, end].join(',');

        expect(dateFilter.convert(date)).toMatchSnapshot();
      });

      it('one date', () => {
        const date = '2018-07-24T20:09:10.971Z';

        expect(dateFilter.convert(date)).toMatchSnapshot();
      });
    });
  });

  describe('orderToFilter', () => {
    it('should work', () => {
      expect(orderToFilter('name.ASC')).toEqual([
        ['name', 'ASC'],
      ]);
    });
  });
});
