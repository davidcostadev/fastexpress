const { Op } = require('sequelize');

const dateFilter = {
  validation: () => true,
  convert: val => {
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

module.exports = {
  dateFilter,
};
