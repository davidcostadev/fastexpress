const fs = require('fs');
const util = require('util');

const mkdir = util.promisify(fs.mkdir);

const readFile = util.promisify(fs.readFile);

const writeFile = util.promisify(fs.writeFile);

const copyFile = util.promisify(fs.copyFile);

const handlerError = fn => async (...args) => {
  try {
    fn(...args);
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
  switch (type) {
    case 'integer':
    case 'number':
      return 'number';
    case 'boolean':
      return 'bool';
    case 'string':
    case 'text':
    default:
      return 'string';
  }
};

const getSequelizeType = type => {
  switch (type) {
    case 'integer':
    case 'number':
      return 'INTEGER';
    case 'boolean':
      return 'BOOLEAN';
    case 'text':
      return 'TEXT';
    case 'string':
    default:
      return 'STRING';
  }
};

const getSeedType = type => {
  switch (type) {
    case 'integer':
    case 'number':
      return 'random.number()';
    case 'boolean':
      return 'random.boolean()';
    case 'text':
      return 'lorem.sentences()';
    case 'string':
    default:
      return 'lorem.words()';
  }
};

function fieldsMigration(fieldsList) {
  if (!fieldsList.length) {
    return {
      fields: '{}',
    };
  }

  const fields = fieldsList
    .map(field => field.split(':'))
    .map(([name, type]) => `${name}: Sequelize.${getSequelizeType(type)}`)
    .join(',\n    ');

  return {
    fields: `${fields},`,
  };
}

function fieldsModel(fieldsList) {
  if (!fieldsList.length) {
    return {
      fields: '{}',
    };
  }

  const fields = fieldsList
    .map(field => field.split(':'))
    .map(([name, type]) => `      ${name}: DataTypes.${getSequelizeType(type)}`)
    .join(',\n');

  return {
    fields: `{\n${fields}\n    }`,
  };
}

function fieldsSeeders(fieldsList) {
  if (!fieldsList.length) {
    return {
      dependencies: '',
      fields: '{}',
    };
  }

  const fields = fieldsList
    .map(field => field.split(':'))
    .map(([name, type]) => `${name}: faker.${getSeedType(type)}`)
    .join(',\n        ');

  return {
    dependencies: "const faker = require('faker');\n\n",
    fields: `${fields},\n        `,
  };
}

function fieldsResource(fieldsList) {
  if (!fieldsList.length) {
    return {
      dependencies: '',
      fields: '{}',
    };
  }

  const fields = fieldsList
    .map(field => field.split(':'))
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
}

module.exports = {
  mkdir,
  readFile,
  writeFile,
  copyFile,
  handlerError,
  fieldsModel,
  fieldsMigration,
  fieldsHandler,
  fieldsSeeders,
  fieldsResource,
};
