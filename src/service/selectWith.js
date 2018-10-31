import selector from '../utils/selector';
import { getModelAlias, listDefaultOptions } from './model';
import * as SelType from '../utils/selectorTypes';

export const selectWithBatch = ({ query }, { options, database }) => (select = {}) => {
  const {
    aliasDatabase,
  } = {
    ...listDefaultOptions,
    ...options,
  };

  const {
    batch,
  } = selector({
    batch: SelType.batchSelType,
  }, query);

  if (batch) {
    let models = batch.split(',');

    models = models.map(getModelAlias(aliasDatabase, database));
    select.include = models;
  }

  return select
}

export const selectWithPagination = ({ query }, configs) => (select = {}) => {const {
    limit,
    page,
    order,
  } = selector({
    limit: SelType.limitSelType,
    page: SelType.pageSelType,
    order: SelType.orderType,
  }, query);

  return  {
    ...select,
    limit,
    offset: parseInt(limit, 10) * (page - 1),
    order,
  };
}

export const selectWithFilters = ({ query }, { options }) => (select = {}) => {
  const {
    filters,
  } = {
    ...listDefaultOptions,
    ...options,
  };

  if (filters) {
    select.where = selector(filters, query);
  }

  return select;
}
