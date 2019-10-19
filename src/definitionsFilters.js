const { Op } = require('sequelize');
const { string } = require('./validate');

const dateFilter = {
  validation: () => true,
  convert: val => {
    if (val.indexOf(',') > -1) {
      let value = val;
      if (typeof val !== 'string') {
        value = val.toString();
      }

      const parts = value.split(',');
      const [start, end] = parts;
      return {
        [Op.gte]: start,
        [Op.lte]: end,
      };
    }

    return val;
  },
};

const stringFilter = {
  validation: string,
  /**
   * To use `LIKE '%some thing%'`
   *
   * @param {string} value
   */
  convert: value => ({
    [Op.like]: `%${value}%`,
  }),
};

module.exports = {
  dateFilter,
  stringFilter,
};
