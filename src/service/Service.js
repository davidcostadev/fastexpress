import paginationParse from '../utils/pagination';
import selector from '../utils/selector';
import * as SelType from '../utils/selectorTypes';
import { EXCEPTION_NOT_FOUND, EXCEPTION_UNPROCESSABLE_ENTITY } from '../controller/errors';
import { getModelAlias, listDefaultOptions } from './model';

const list = async ({ query }, Model, { options, database }) => {
  const {
    filters,
    aliasDatabase,
  } = {
    ...listDefaultOptions,
    ...options,
  };
  let where = {};

  const {
    limit,
    page,
    batch,
    order,
  } = selector({
    limit: SelType.limitSelType,
    page: SelType.pageSelType,
    batch: SelType.batchSelType,
    order: SelType.orderType,
    ...filters,
  }, query);

  const select = {
    limit,
    offset: parseInt(limit, 10) * (page - 1),
    order,
  };

  if (filters) {
    where = selector(filters, query);
    select.where = where;
  }

  if (batch) {
    let models = batch.split(',');

    models = models.map(getModelAlias(aliasDatabase, database));
    select.include = models;
  }

  try {
    const data = await Model.findAll(select);
    const { count } = await Model.findAndCountAll({ where });
    const pagination = paginationParse(count, page, limit);

    return {
      data: JSON.parse(JSON.stringify(data)),
      pagination,
    };
  } catch (e) {
    console.error(e);
    throw new Error(EXCEPTION_NOT_FOUND);
  }
};

const get = async ({ params, query }, Model, { options, database }) => {
  const { id } = params;
  const {
    filters,
    aliasDatabase,
  } = {
    ...listDefaultOptions,
    ...options,
  };
  const {
    batch,
  } = selector({
    batch: SelType.batchSelType,
    ...filters,
  }, query);

  const select = {
    where: { id }
  };
  if (batch) {
    let models = batch.split(',');

    models = models.map(getModelAlias(aliasDatabase, database));
    select.include = models;
  }

  try {
    const entity = await Model.findOne(select);

    if (!entity) {
      throw new Error(EXCEPTION_NOT_FOUND);
    }

    return JSON.parse(JSON.stringify(entity));
  } catch (e) {
    console.error(e);
    throw new Error(EXCEPTION_NOT_FOUND);
  }
};

const create = async ({ body }, Model, { definitions }) => {
  const dataBody = selector(definitions, body);

  try {
    const entity = await Model.create(dataBody);

    return entity;
  } catch (e) {
    throw e;
  }
};

const update = async ({ params, body }, Model, { definitions }) => {
  const { id } = params;

  const dataBody = selector(definitions, body);

  try {
    const entity = await Model.findById(id);

    if (!entity) {
      throw new Error(EXCEPTION_NOT_FOUND);
    }

    const updated = await entity.update(dataBody);

    return updated;
  } catch (e) {
    if (e.message === EXCEPTION_NOT_FOUND) {
      throw new Error(EXCEPTION_NOT_FOUND);
    }

    throw new Error(EXCEPTION_UNPROCESSABLE_ENTITY);
  }
};

const destroy = async (req, Model) => {
  const { id } = req.params;

  try {
    await Model.destroy({
      where: { id },
    });

    return true;
  } catch (e) {
    throw new Error(EXCEPTION_UNPROCESSABLE_ENTITY);
  }
};

export default {
  list,
  create,
  get,
  update,
  destroy,
};
