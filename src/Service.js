import { compose } from 'ramda';
import paginationParse from './pagination';
import selector from './selector';
import * as SelType from './selectorTypes';
import { EXCEPTION_NOT_FOUND, EXCEPTION_UNPROCESSABLE_ENTITY } from './lib/errors';
import {
  selectWithBatch,
  selectWithFilters,
  selectWithPagination,
} from './selectWith';

const list = async (req, Model, configs) => {
  const { limit, page } = selector({
    limit: SelType.limitSelType,
    page: SelType.pageSelType,
  }, req.query);

  const select = compose(
    selectWithPagination(req, configs),
    selectWithBatch(req, configs),
    selectWithFilters(req, configs),
  )();

  const where = select.where ? select.where : {};

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

const get = async (req, Model, configs) => {
  const { id } = req.params;

  const select = selectWithBatch(req, configs)({
    where: { id },
  });

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
