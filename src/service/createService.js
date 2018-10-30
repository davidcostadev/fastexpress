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

export const createResourceService = (model, {
  only = ACTIONS,
  definitions = {},
  options = {},
  custom = {},
  database,
}) => {
  const customNew = {}


  const methods = only.reduce((pre, cur) => {
    pre[cur] = Service[cur];
    return pre;
  }, custom)


  const methodsWithArgs = Object.keys(methods)
    .map(key => ({
      [key]: req => methods[key](req, model, { definitions, options, database })
    })).reduce((pre, cur) => Object.assign(pre, cur), {});

  return methodsWithArgs;
};
