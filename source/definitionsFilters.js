import { Op } from 'sequelize';
import {
  nameSelType,
  emailSelType,
  userIdSelType,
  accountIdSelType,
  valueSelType,
  typeSelType,
  isPaidSelType,
} from './selectorTypes.js';

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

const createdAt = dateFilter;
const updated = dateFilter;

const timestamp = {
  createdAt,
  updated,
};

export const userFilters = {
  id: userIdSelType,
  name: nameSelType,
  email: emailSelType,
  ...timestamp,
};

export const accountFilters = {
  UserId: userIdSelType,
  name: nameSelType,
  type: typeSelType,
  initalValue: valueSelType,
  ...timestamp,
};

export const categoryFilters = {
  UserId: userIdSelType,
  name: nameSelType,
  type: typeSelType,
  ...timestamp,
};

export const transactionFilters = {
  UserId: userIdSelType,
  AccountId: accountIdSelType,
  name: nameSelType,
  value: valueSelType,
  type: typeSelType,
  isPaid: isPaidSelType,
  transactionDate: dateFilter,
  ...timestamp,
};

export const journalFilters = {
  UserId: userIdSelType,
  type: typeSelType,
  ...timestamp,
};
