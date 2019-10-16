const camelCase = require('lodash.camelcase');
const snakeCase = require('lodash.snakecase');
const { plural } = require('pluralize');
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

  const nameCameCase = camelCase(name);
  const nameCameCaseUpperFirst = nameCameCase.replace(/^(.)/, nameCameCase[0].toLocaleUpperCase());

  const pluralized = plural(nameCameCaseUpperFirst);
  const nameSnakeCase = snakeCase(pluralized);
  const unix = new Date()
    .toISOString()
    .replace(/[-:T]/g, '')
    .substring(0, 14);

  await copyTemplate('files/resource.js.handlebars', `src/resources/${pluralized}.js`, {
    ...fieldsResource(fields),
    name: pluralized,
  });
  await copyTemplate('files/model.js.handlebars', `src/models/${pluralized}.js`, {
    ...fieldsModel(fields),
    name: pluralized,
  });
  await copyTemplate('files/seed.js.handlebars', `src/seeders/${unix}-${nameSnakeCase}.js`, {
    ...fieldsSeeders(fields),
    name: pluralized,
  });
  await copyTemplate(
    'files/migration.js.handlebars',
    `src/migrations/${unix}-create_${nameSnakeCase}_table.js`,
    {
      ...fieldsMigration(fields),
      name: pluralized,
    },
  );

  global.console.log(`Resource \`${pluralized}\` was generated with success.
Follow all files generated:

- src/resources/${pluralized}.js
- src/models/${pluralized}.js
- src/seeders/${unix}-${nameSnakeCase}.js
- src/migrations/${unix}-create_${nameSnakeCase}_table.js

Now you just need do add the resource on your routes:
on file src/routes.js add the following line:
  \`const Tasks = require('./resourcers/Tasks');\`
and
  \`.add('tasks', Tasks)\``);
};

module.exports = resourceHandler;
