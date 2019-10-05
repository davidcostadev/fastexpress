const camelCase = require('lodash.camelcase');
const snakeCase = require('lodash.snakecase');
const { singular, plural } = require('pluralize');
const {
  copyTemplate,
  fieldsHandler,
  fieldsModel,
  fieldsResource,
  fieldsSeeders,
  fieldsMigration,
} = require('./utils');

const resourceHandler = async ({ name, ...args }) => {
  const fields = fieldsHandler({ ...args });

  const nameCameCaseUpperFirst = camelCase(name).replace(/^(.)/, name[0].toLocaleUpperCase());

  const pluralized = plural(nameCameCaseUpperFirst);
  const singularised = singular(nameCameCaseUpperFirst);
  const nameSnakeCase = snakeCase(pluralized);
  const unix = new Date()
    .toISOString()
    .replace(/[-:T]/g, '')
    .substring(0, 14);

  await copyTemplate('files/resource.js.handlebars', `src/resources/${pluralized}.js`, {
    ...fieldsResource(fields),
    name: singularised,
  });
  await copyTemplate('files/model.js.handlebars', `src/models/${singularised}.js`, {
    ...fieldsModel(fields),
    nameSingularised: singularised,
    namePluralized: pluralized,
  });
  await copyTemplate('files/seed.js.handlebars', `src/seeders/${unix}-${nameSnakeCase}.js`, {
    ...fieldsSeeders(fields),
    name: pluralized,
  });
  await copyTemplate(
    'files/migration.js.handlebars',
    `src/migrations/${unix}-create_${nameSnakeCase}.js`,
    {
      ...fieldsMigration(fields),
      name: pluralized,
    },
  );
};

module.exports = resourceHandler;
