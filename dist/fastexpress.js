//  fastexpress v1.2.0-dev.2 - (c) 2018 David Costa - may be freely distributed under the MIT license.

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jsonwebtoken'), require('ramda'), require('moment'), require('sequelize'), require('bcrypt')) :
  typeof define === 'function' && define.amd ? define(['exports', 'jsonwebtoken', 'ramda', 'moment', 'sequelize', 'bcrypt'], factory) :
  (factory((global.fastexpress = {}),global.jwt,global.R,global.Moment,global.sequelize,global.bcrypt));
}(this, (function (exports,jwt,R,Moment,sequelize,bcrypt) { 'use strict';

  jwt = jwt && jwt.hasOwnProperty('default') ? jwt['default'] : jwt;
  R = R && R.hasOwnProperty('default') ? R['default'] : R;
  Moment = Moment && Moment.hasOwnProperty('default') ? Moment['default'] : Moment;
  bcrypt = bcrypt && bcrypt.hasOwnProperty('default') ? bcrypt['default'] : bcrypt;

  const getToken = (req) => {
    if (typeof req.body.token !== 'undefined') {
      return req.body.token;
    } else if (typeof req.query.token !== 'undefined') {
      return req.query.token;
    } else if (typeof req.headers.authorization !== 'undefined') {
      return req.headers.authorization.replace('Bearer ', '');
    }

    return null;
  };

  const checkAuth = jwtEncryption => (req, res, next) => {
    const token = getToken(req);

    if (!token) {
      res.status(403).send({
        message: 'No token provided',
      });
    } else {
      jwt.verify(token, jwtEncryption, (err, decoded) => {
        if (err) {
          res.status(500).send({
            message: 'Invalid auth token provided.',
          });
        } else {
          res.user = decoded;

          next();
        }
      });
    }
  };

  const onlyUser = (req, res, next) => {
    let filter = 'UserId';

    if (req.route.path === '/api/v1/users/') {
      filter = 'id';
    }

    req.query = {
      ...req.query,
      [filter]: res.user.id,
    };

    req.body = {
      ...req.body,
      [filter]: res.user.id,
    };

    next();
  };

  // export const middleware = [
  //   checkAuth,
  //   onlyUser,
  // ];

  const createMiddleware = (jwtEncryption) => ([
    checkAuth(jwtEncryption),
    onlyUser,
  ]);

  const EXCEPTION_NOT_FOUND = 'not found';
  const EXCEPTION_UNPROCESSABLE_ENTITY = 'unprocessable entity';

  const defaultResponse = async (req, res, service) => {
    try {
      res.json(await service(req));
    } catch (e) {
      res.status(500).json({
        error: e.message,
      });
    }
  };

  const list = defaultResponse;
  const create = defaultResponse;
  const update = defaultResponse;

  const get = async (req, res, service) => {
    try {
      res.json(await service(req));
    } catch (e) {
      if (e.message === EXCEPTION_NOT_FOUND) {
        res.status(404).send(e.message);
      } else {
        res.status(500).send(e);
      }
    }
  };

  const destroy = async (req, res, service) => {
    try {
      await service(req);
      res.status(204).send();
    } catch (e) {
      res.status(500).send(e);
    }
  };

  var Controller = {
    list,
    create,
    get,
    update,
    destroy,
  };

  const string = R.compose(Boolean, R.length);

  const number = num => Number.isInteger(parseInt(num, 10));

  const float = num => !Number.isNaN(parseFloat(num));

  const bool = val => typeof Boolean(val) === 'boolean';

  var validate = /*#__PURE__*/Object.freeze({
    string: string,
    number: number,
    float: float,
    bool: bool
  });

  const orderToFilter = (val) => {
    const fields = val.split(',').map(a => a.split('.'));

    return fields;
  };

  var convert = /*#__PURE__*/Object.freeze({
    orderToFilter: orderToFilter,
    default: orderToFilter
  });

  const stringType = {
    validation: string,
  };

  const numberType = {
    validation: number,
  };

  const orderType = {
    validation: string,
    convert: orderToFilter,
    default: [['id', 'DESC']],
  };

  const batchSelType = stringType;

  const limitSelType = {
    ...numberType,
    default: 100,
  };

  const pageSelType = {
    ...numberType,
    default: 1,
  };

  const dateFilter = {
    validation: () => true,
    convert: (val) => {
      if (val.indexOf(',') > -1) {
        const parts = val.split(',');
        const [start, end] = parts;
        return {
          [sequelize.Op.gte]: start,
          [sequelize.Op.lte]: end,
        };
      }

      return val;
    },
  };

  const listDefaultOptions = {
    where: {},
    filter: null,
    aliasDatabase: {},
  };

  const getModelAlias = (aliasDatabase, db) => (model) => {
    const aliasList = Object.keys(aliasDatabase);

    if (aliasList.includes(model)) {
      const alias = aliasList[aliasList.indexOf(model)];

      return {
        model: db[aliasDatabase[alias]],
        as: model,
      };
    }

    return {
      model: db[model],
    };
  };

  /* eslint no-param-reassign: "off" */
  /* eslint no-underscore-dangle: "off" */
  const cryptPassword = bcryptSalt => (user) => {
    if (user.password !== user._previousDataValues.password) {
      return bcrypt
        .hash(user.password, bcrypt.genSaltSync(bcryptSalt))
        .then((hash) => {
          user.password = hash;
        });
    }

    return null;
  };

  const getTotalPages = (totalItems, perPage) => Math.ceil(totalItems / perPage);

  const getNextPageIfExist = (currentPage, totalPages) => (
    currentPage < totalPages ? currentPage + 1 : null
  );
  const getPreviousPageIfExist = currentPage => (
    currentPage > 1 ? currentPage - 1 : null
  );

  const paginationParse = (totalItems, currentPage, perPage) => {
    const totalPages = getTotalPages(totalItems, perPage);

    return {
      totalItems,
      currentPage,
      perPage,
      totalPages,
      nextPage: getNextPageIfExist(currentPage, totalPages),
      previousPage: getPreviousPageIfExist(currentPage),
    };
  };

  const resources = (prefix, { router, controller }) => {
    router.get(`${prefix}/`, controller.list);
    router.post(`${prefix}/`, controller.create);
    router.get(`${prefix}/:id`, controller.get);
    router.delete(`${prefix}/:id`, controller.destroy);
    router.put(`${prefix}/:id`, controller.update);
  };

  const resourcesAuth = (prefix, { router, middleware, controller }) => {
    router.get(`${prefix}/`, middleware, controller.list);
    router.post(`${prefix}/`, middleware, controller.create);
    router.get(`${prefix}/:id`, middleware, controller.get);
    router.delete(`${prefix}/:id`, middleware, controller.destroy);
    router.put(`${prefix}/:id`, middleware, controller.update);
  };

  const namespaceCreator = (namespace = '/') => (url = '') => `${namespace}${url}`;


  const namespaceIndexCreator = namespace => urls => namespace()
    .split('/')
    .filter(word => !!word)
    .reduceRight((pre, cur) => ({
      [cur]: pre,
    }), urls);

  const defaultNamespace = (url) => `/${url}`;


  const resourceWithAuth = (url, controller, { router, middleware, namespace = defaultNamespace }) => (
    resourcesAuth(namespace(url), {
      controller,
      router,
      middleware,
    })
  );

  const resourceList = (url, { custom = [], namespace = defaultNamespace } = {}) => ([
    ...[
      controller => (`[get] ${controller}`),
      controller => (`[post] ${controller}`),
      controller => (`[get] ${controller}/:id`),
      controller => (`[delete] ${controller}/:id`),
      controller => (`[put] ${controller}/:id`),
    ].map(method => method(namespace(url))),
    ...custom,
  ]);

  const selector = (definitions, query = {}) => {
    const select = {};

    Object.keys(definitions).forEach((key) => {
      if (typeof query[key] !== 'undefined') {
        if (definitions[key].validation(query[key])) {
          if (typeof definitions[key].convert !== 'undefined') {
            select[key] = definitions[key].convert(query[key], key);
          } else {
            select[key] = query[key];
          }
        } else if (typeof definitions[key].default !== 'undefined') {
          select[key] = definitions[key].default;
        }
      } else if (typeof definitions[key].default !== 'undefined') {
        select[key] = definitions[key].default;
      }
    });

    return select;
  };

  const list$1 = async ({ query }, Model, { options, database }) => {
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
      limit: limitSelType,
      page: pageSelType,
      batch: batchSelType,
      order: orderType,
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

  const get$1 = async (req, Model) => {
    const { id } = req.params;

    try {
      const entity = await Model.findById(id);

      if (!entity) {
        throw new Error(EXCEPTION_NOT_FOUND);
      }

      return entity;
    } catch (e) {
      throw new Error(EXCEPTION_NOT_FOUND);
    }
  };

  const create$1 = async ({ body }, Model, { definitions }) => {
    const dataBody = selector(definitions, body);

    try {
      const entity = await Model.create(dataBody);

      return entity;
    } catch (e) {
      throw e;
    }
  };

  const update$1 = async ({ params, body }, Model, { definitions }) => {
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

  const destroy$1 = async (req, Model) => {
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

  var Service = {
    list: list$1,
    create: create$1,
    get: get$1,
    update: update$1,
    destroy: destroy$1,
  };

  const ACTIONS = ['create', 'get', 'list', 'destroy', 'update'];

  const createResourceController = (service, { only = ACTIONS, custom = {} } = {}) => {
    const methods = {};

    only.forEach((action) => {
      methods[action] = (req, res) => Controller[action](req, res, service[action]);
    });

    return {
      ...methods,
      ...custom,
    };
  };

  const serviceDefaultProps = ({
    form,
    filters,
    database,
  }) => ({
    definitions: form,
    options: { filters },
    database,
  });

  const createResourceService = (model, {
    only = ACTIONS,
    definitions = {},
    options = {},
    custom = {},
    database,
  }) => {
    const methods = {};

    only.forEach((action) => {
      methods[action] = req => Service[action](req, model, { definitions, options, database });
    });

    return {
      ...methods,
      ...custom,
    };
  };

  const { table } = require('./create');

  const createTable = (name, callback, then = () => {}) => (queryInterface, DataTypes) => (
    queryInterface.createTable(name, {
      ...table(DataTypes, {
        ...callback(DataTypes),
      }),
    }).then(() => then(queryInterface, DataTypes))
  );

  const dropTable = name => queryInterface => queryInterface.dropTable(name);

  const addConstraint = (queryInterface, tableCurrent, { tableName, field, name }) => (
    queryInterface.addConstraint(tableCurrent, [field], {
      type: 'foreign key',
      name,
      references: {
        table: tableName,
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'no action',
    })
  );

  module.exports = {
    dropTable,
    createTable,
    addConstraint,
  };

  var helper = /*#__PURE__*/Object.freeze({

  });

  const id = DataTypes => ({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
  });

  const timestamp$1 = DataTypes => ({
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  });

  const table$1 = (DataTypes, fields = {}) => ({
    ...id(DataTypes),
    ...fields,
    ...timestamp$1(DataTypes),
  });

  module.exports = {
    id,
    timestamp: timestamp$1,
    table: table$1,
  };

  var create$2 = /*#__PURE__*/Object.freeze({

  });

  exports.createMiddleware = createMiddleware;
  exports.Controller = Controller;
  exports.dateFilter = dateFilter;
  exports.orderToFilter = orderToFilter;
  exports.cryptPassword = cryptPassword;
  exports.getModelAlias = getModelAlias;
  exports.paginationParse = paginationParse;
  exports.resources = resources;
  exports.resourcesAuth = resourcesAuth;
  exports.namespaceCreator = namespaceCreator;
  exports.namespaceIndexCreator = namespaceIndexCreator;
  exports.resourceList = resourceList;
  exports.resourceWithAuth = resourceWithAuth;
  exports.selector = selector;
  exports.validate = validate;
  exports.convert = convert;
  exports.Service = Service;
  exports.createController = createResourceController;
  exports.createService = createResourceService;
  exports.serviceDefaultProps = serviceDefaultProps;
  exports.migrationActions = helper;
  exports.migrationHelper = create$2;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
