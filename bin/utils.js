const fs = require('fs');
const path = require('path');
const util = require('util');
const childProcess = require('child_process');
const Handlebars = require('handlebars');

const exec = util.promisify(childProcess.exec);
const mkdir = util.promisify(fs.mkdir);

const readFile = util.promisify(fs.readFile);

const writeFile = util.promisify(fs.writeFile);

const copyFile = util.promisify(fs.copyFile);

const handlerError = fn => async (...args) => {
  try {
    await fn(...args);
  } catch (error) {
    switch (error.errno) {
      case -17:
        console.error(error.message);
        break;

      default:
        console.error(error);
        break;
    }
  }
};

function fieldsHandler(args) {
  if (typeof args.attributes === 'undefined') return null;

  args._.shift();
  const validFields = args._.filter(field =>
    field.match(/^[a-z]+:(string|text|boolean|number|integer)$/i),
  );

  return [args.attributes, ...validFields];
}

const getType = type => {
  const isNumber = () => 'number';
  const isBoolean = () => 'bool';
  const isText = () => 'string';

  const types = {
    number: isNumber,
    integer: isNumber,
    boolean: isBoolean,
    text: isText,
    string: isText,
    default: isText,
  };

  return (types[type] || types.default)();
};

const getSequelizeType = type => {
  const isNumber = () => 'INTEGER';
  const isBoolean = () => 'BOOLEAN';
  const isText = () => 'TEXT';
  const isChar = () => 'STRING';

  const types = {
    number: isNumber,
    integer: isNumber,
    boolean: isBoolean,
    text: isText,
    string: isChar,
    default: isChar,
  };

  return (types[type] || types.default)();
};

const getSeedType = type => {
  const isNumber = () => 'random.number()';
  const isBoolean = () => 'random.boolean()';
  const isText = () => 'lorem.sentences()';
  const isChar = () => 'lorem.words()';
  const types = {
    number: isNumber,
    integer: isNumber,
    boolean: isBoolean,
    text: isText,
    string: isChar,
    default: isChar,
  };

  return (types[type] || types.default)();
};

const fieldsBase = fn => fieldsList => {
  if (!fieldsList.length) {
    return {
      dependencies: '',
      fields: '{}',
    };
  }

  const fields = fieldsList.map(field => field.split(':'));

  return fn(fields);
};

const fieldsMigration = fieldsBase(fieldsList => {
  const fields = fieldsList
    .map(([name, type]) => `${name}: Sequelize.${getSequelizeType(type)}`)
    .join(',\n    ');

  return {
    fields: `${fields},`,
  };
});

const fieldsModel = fieldsBase(fieldsList => {
  const fields = fieldsList
    .map(([name, type]) => `      ${name}: DataTypes.${getSequelizeType(type)}`)
    .join(',\n');

  return {
    fields: `{\n${fields}\n    }`,
  };
});

const fieldsSeeders = fieldsBase(fieldsList => {
  const fields = fieldsList
    .map(([name, type]) => `${name}: faker.${getSeedType(type)}`)
    .join(',\n        ');

  return {
    dependencies: "const faker = require('faker');\n\n",
    fields: `${fields},\n        `,
  };
});

const fieldsResource = fieldsBase(fieldsList => {
  const fields = fieldsList
    .map(
      ([name, type]) => `    ${name}: {
      validation: validate.${getType(type)},
    }`,
    )
    .join(',\n');

  return {
    dependencies: ', validate',
    fields: `{\n${fields}\n  }`,
  };
});

const destination = dir => path.resolve('.', dir);

const source = file => path.resolve(__dirname, `templates/${file}`);

const copyTemplate = async (fileSource, fileDest, params = {}) => {
  if (!Object.keys(params).length) {
    await copyFile(source(fileSource), destination(fileDest));
  } else {
    const content = await readFile(source(fileSource), 'utf8');

    const templateIt = Handlebars.compile(content);
    const compiled = templateIt(params);
    await writeFile(destination(fileDest), compiled);
  }
};

module.exports = {
  mkdir,
  readFile,
  writeFile,
  copyFile,
  handlerError,
  getType,
  getSeedType,
  getSequelizeType,
  fieldsModel,
  fieldsMigration,
  fieldsHandler,
  fieldsSeeders,
  fieldsResource,
  destination,
  copyTemplate,
  exec,
};
