const Service = require('./Service');
const { ACTIONS } = require('./definitions');

const serviceDefaultProps = ({ form, filters, database }) => ({
  definitions: form,
  options: { filters },
  database,
});

const createResourceService = (
  Model,
  { only = ACTIONS, definitions = {}, options = {}, custom = {}, database },
) => {
  const config = {
    definitions,
    options,
    database,
  };

  const methodsOnly = only.reduce(
    (methods, method) => ({
      ...methods,
      [method]: Service[method],
    }),
    custom,
  );

  const methodsWithArgs = Object.keys(methodsOnly)
    .map(key => ({
      [key]: req => methodsOnly[key](req, Model, config),
    }))
    .reduce((pre, cur) => Object.assign(pre, cur), {});

  return methodsWithArgs;
};

module.exports = {
  serviceDefaultProps,
  createResourceService,
};
