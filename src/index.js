const Controller = require('./Controller');
const createController = require('./createController');
const migrationActions = require('./helper');
const migrationHelper = require('./create');
const Service = require('./Service');
const { serviceDefaultProps, createResourceService: createService } = require('./createService');
const { cryptPassword, getModelAlias } = require('./model');
const {
  resources,
  resourcesAuth,
  namespaceIndexCreator,
  resourceList,
  resourceWithAuth,
  namespaceCreator,
} = require('./routers');
const createMiddleware = require('./authMiddleware');
const { dateFilter } = require('./definitionsFilters');
// eslint-disable-next-line import/no-duplicates
const { orderToFilter } = require('./convert');
const paginationParse = require('./pagination');
const selector = require('./selector');
const validate = require('./validate');
// eslint-disable-next-line import/no-duplicates
const convert = require('./convert');
const Resources = require('./Resources');
const type = require('./selectorTypes');
const server = require('./server');
const endpoint = require('./endpoint');

module.exports = {
  createMiddleware,
  Controller,
  dateFilter,
  orderToFilter,
  endpoint,
  cryptPassword,
  getModelAlias,
  paginationParse,
  Resources,
  resources,
  resourcesAuth,
  namespaceCreator,
  namespaceIndexCreator,
  resourceList,
  resourceWithAuth,
  selector,
  validate,
  convert,
  Service,
  createController,
  createService,
  serviceDefaultProps,
  migrationActions,
  migrationHelper,
  server,
  type,
};
