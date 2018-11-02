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
});

export const createResourceService = (model, {
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

