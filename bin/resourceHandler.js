const path = require('path');
const Handlebars = require('handlebars');
const camelCase = require('lodash.camelcase');
const snakeCase = require('lodash.snakecase');
const { singular, plural } = require('pluralize');
const {
  copyFile,
  readFile,
  writeFile,
  fieldsHandler,
  fieldsModel,
  fieldsResource,
  fieldsSeeders,
  fieldsMigration,
} = require('./utils');

const resourceHandler = async ({ name, ...args }) => {
  const destination = (dir = '') => path.resolve('.', dir.length ? `src/${dir}` : `${name}`);

  const source = file => path.resolve(__dirname, `templates/files/${file}`);

  const copyTemplate = async (fileSource, fileDest, params = {}) => {
    if (!Object.keys(params).length) {
      await copyFile(source(fileSource), destination(fileSource));
    } else {
      const content = await readFile(source(fileSource), 'utf8');

      const templateIt = Handlebars.compile(content);
      const compiled = templateIt(params);
      await writeFile(destination(fileDest), compiled);
    }
  };

  const fields = fieldsHandler({ ...args });

  const nameCameCaseUpperFirst = camelCase(name).replace(/^(.)/, name[0].toLocaleUpperCase());

  const pluralized = plural(nameCameCaseUpperFirst);
  const singularised = singular(nameCameCaseUpperFirst);
  const nameSnakeCase = snakeCase(pluralized);
  const unix = new Date()
    .toISOString()
    .replace(/[-:T]/g, '')
    .substring(0, 14);

  await copyTemplate('resource.js.handlebars', `resources/${pluralized}.js`, {
    ...fieldsResource(fields),
    name: singularised,
  });
  await copyTemplate('model.js.handlebars', `models/${singularised}.js`, {
    ...fieldsModel(fields),
    nameSingularised: singularised,
    namePluralized: pluralized,
  });
  await copyTemplate('seed.js.handlebars', `seeders/${unix}-${nameSnakeCase}.js`, {
    ...fieldsSeeders(fields),
    name: pluralized,
  });
  await copyTemplate('migration.js.handlebars', `migrations/${unix}-create_${nameSnakeCase}.js`, {
    ...fieldsMigration(fields),
    name: pluralized,
  });
};

module.exports = resourceHandler;
