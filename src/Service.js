'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _pagination = require('./pagination.js');

var _pagination2 = _interopRequireDefault(_pagination);

var _selector = require('./selector.js');

var _selector2 = _interopRequireDefault(_selector);

var _selectorTypes = require('./selectorTypes.js');

var SelType = _interopRequireWildcard(_selectorTypes);

var _errors = require('./errors.js');

var _model = require('./model.js');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const list = async ({ query }, Model, { options, database }) => {
  const {
    filters,
    fields,
    aliasDatabase
  } = _extends({}, _model.listDefaultOptions, options);
  let where = {};

  const {
    limit,
    page,
    batch,
    order
  } = (0, _selector2.default)(_extends({
    limit: SelType.limitSelType,
    page: SelType.pageSelType,
    batch: SelType.batchSelType,
    order: SelType.orderType
  }, filters), query);

  const select = {
    limit,
    offset: parseInt(limit, 10) * (page - 1),
    order
  };

  if (filters) {
    where = (0, _selector2.default)(filters, query);
    select.where = where;
  }

  if (batch) {
    let models = batch.split(',');

    models = models.map((0, _model.getModelAlias)(aliasDatabase, database));
    select.include = models;
  }

  try {
    const data = await Model.findAll(select);
    const { count } = await Model.findAndCountAll({ where });
    const pagination = (0, _pagination2.default)(count, page, limit);

    return {
      data: (0, _model.clearData)(data, fields),
      pagination
    };
  } catch (e) {
    console.error(e);
    throw new Error(_errors.EXCEPTION_NOT_FOUND);
  }
};

const get = async (req, Model) => {
  const { id } = req.params;

  try {
    const entity = await Model.findById(id);

    if (!entity) {
      throw new Error(_errors.EXCEPTION_NOT_FOUND);
    }

    return entity;
  } catch (e) {
    throw new Error(_errors.EXCEPTION_NOT_FOUND);
  }
};

const create = async ({ body }, Model, { definitions }) => {
  const dataBody = (0, _selector2.default)(definitions, body);

  try {
    const entity = await Model.create(dataBody);

    return entity;
  } catch (e) {
    throw e;
  }
};

const update = async ({ params, body }, Model, { definitions }) => {
  const { id } = params;

  const dataBody = (0, _selector2.default)(definitions, body);

  try {
    const entity = await Model.findById(id);

    if (!entity) {
      throw new Error(_errors.EXCEPTION_NOT_FOUND);
    }

    const updated = await entity.update(dataBody);

    return updated;
  } catch (e) {
    if (e.message === _errors.EXCEPTION_NOT_FOUND) {
      throw new Error(_errors.EXCEPTION_NOT_FOUND);
    }

    throw new Error(_errors.EXCEPTION_UNPROCESSABLE_ENTITY);
  }
};

const destroy = async (req, Model) => {
  const { id } = req.params;

  try {
    await Model.destroy({
      where: { id }
    });

    return true;
  } catch (e) {
    throw new Error(_errors.EXCEPTION_UNPROCESSABLE_ENTITY);
  }
};

exports.default = {
  list,
  create,
  get,
  update,
  destroy
};