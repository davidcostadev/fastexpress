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
  const methods = {};
  const customNew = {}

  only.forEach((action) => {
    methods[action] = req => Service[action](req, model, { definitions, options, database });
  });

  Object.keys(custom).map(key => (
    customNew[key] = req => custom[key](req, model, { definitions, options, database })
  ))

  return {
    ...methods,
    ...customNew,
  };
};

