import { Op } from 'sequelize';

// eslint-disable-next-line import/prefer-default-export
export const dateFilter = {
  validation: () => true,
  convert: (val) => {
    if (val.indexOf(',') > -1) {
      const parts = val.split(',');
      const [start, end] = parts;
      return {
        [Op.gte]: start,
        [Op.lte]: end,
      };
    }

    return val;
  },
};
