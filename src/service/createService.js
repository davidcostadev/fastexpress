import Service from './Service';
import { ACTIONS } from '../utils/definitions';

export const serviceDefaultProps = ({
  form,
  filters,
  database,
}) => ({
  definitions: form,
  options: { filters },
  database,
  custom,
});

export const createResourceService = (Model, {
  only = ACTIONS,
  definitions = {},
  options = {},
  custom = {},
  database,
}) => {
  const config = {
    definitions,
    options,
    database,
  };

  const methodsOnly = only.reduce((methods, method) => {
    methods[method] = Service[method];
    return methods;
  }, custom)

  const methodsWithArgs = Object.keys(methods)
    .map(key => ({
      [key]: req => methodsOnly[key](req, Model, config)
    }))
    .reduce((pre, cur) => Object.assign(pre, cur), {});

  return methodsWithArgs;
};
