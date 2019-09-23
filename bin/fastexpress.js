#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const util = require('util');
const Handlebars = require('handlebars');

const mkdir = util.promisify(fs.mkdir);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const copyFile = util.promisify(fs.copyFile);

const generateHandler = async ({ name, template }) => {
  const destination = (dir = '') => path.resolve('.', dir.length ? `${name}/${dir}` : `${name}`);

  const source = file => path.resolve(__dirname, `templates/${template}/${file}`);

  const copyTemplate = async (fileSource, params = {}) => {
    if (!Object.keys(params).length) {
      await copyFile(source(fileSource), destination(fileSource));
    } else {
      const content = await readFile(source(fileSource), 'utf8');

      const templateIt = Handlebars.compile(content);
      const compiled = templateIt(params);
      await writeFile(destination(fileSource), compiled);
    }
  };

  try {
    await mkdir(destination(), { recursive: true });
    await mkdir(destination('config'), { recursive: true });
    await mkdir(destination('src'), { recursive: true });
    await mkdir(destination('src/migrations'), { recursive: true });
    await mkdir(destination('src/models'), { recursive: true });
    await mkdir(destination('src/resources'), { recursive: true });
    await mkdir(destination('src/seeders'), { recursive: true });

    await copyTemplate('.sequelizerc');
    await writeFile(destination('.gitignore'), 'node_modules\n');
    await copyTemplate('package.json');
    await copyTemplate('README.md');
    await copyTemplate('config/example.database.json');
    await copyTemplate('src/models/index.js');
    await copyTemplate('src/routes.js');
    await copyTemplate('src/server.js');

    // eslint-disable-next-line no-console
    console.log(`Generate completed
Run these commands to start
cd ./${name}
git init
npm install or yarn
npm run dev`);
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

const generate = {
  handler: generateHandler,
  builder: yargs =>
    yargs
      .positional('name', {
        describe: 'the name of your project',
        default: 'restful-api-project',
      })
      .option('template', { alias: 't', default: 'basic', describe: 'Choose a different template' })
      .choices('template', ['basic', 'auth', 'complete']),
};

// eslint-disable-next-line no-unused-expressions
require('yargs')
  .usage('Usage: $0 <command> [options]')
  .demandCommand(1, 'You need at least one command before moving on')
  .command('generate [name]', 'Generate a new project', generate)
  .example('$0 generate your-project-name', 'To create a new project with fastexpress')
  .help('help')
  .alias('help', 'h').argv;
