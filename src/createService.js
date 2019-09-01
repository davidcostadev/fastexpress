const Service = require('./Service');
const { ACTIONS } = require('./definitions');

/**
 * @deprecated
 *
 * @param {objects} { form, filters, database }
 * @returns {object}
 */
const serviceDefaultProps = ({ form, filters, database }) => {
  // eslint-disable-next-line no-console
  console.warn('Deprecated: Use just `createService` instead of `serviceDefaultProps`.');
  return {
    form,
    filters,
    database,
  };
};

const createResourceService = (
  Model,
  { only = ACTIONS, form = {}, filters, definitions = {}, options = {}, custom = {}, database },
) => {
  if (Object.keys(definitions).length) {
    // eslint-disable-next-line no-console
    console.warn('Deprecated: Use just `form` instead of `definitions`.');
  }
  if (Object.keys(options).length) {
    // eslint-disable-next-line no-console
    console.warn('Deprecated: Use just `filters` instead of `options`.');
  }

  const newForm = Object.keys(form).length ? form : definitions;
  const newFilters = typeof filters !== 'undefined' ? filters : options.filters;

  const config = {
    definitions: newForm,
    options: {
      filters: typeof newFilters !== 'undefined' ? { ...newForm, ...newFilters } : newForm,
    },
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
