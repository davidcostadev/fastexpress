const Controller = require('./Controller');
const { ACTIONS } = require('./definitions');

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

module.exports = createResourceController;
