import Controller from './Controller';
import { ACTIONS } from './definitions';

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

export default createResourceController;
