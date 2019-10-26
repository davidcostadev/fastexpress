#!/usr/bin/env node
const newHandler = require('./newHandler.js');
const resourceHandler = require('./resourceHandler');
const { handlerError } = require('./utils');

const newCommand = {
  handler: handlerError(newHandler),
  builder: yargs =>
    yargs
      .positional('name', {
        describe: 'the name of your project',
        default: 'restful-api-project',
      })
      .option('template', { alias: 't', default: 'basic', describe: 'Choose a different template' })
      .choices('template', ['basic', 'auth', 'complete']),
};

const resourceCommand = {
  handler: handlerError(resourceHandler),
  builder: yargs =>
    yargs
      .positional('name', {
        describe: 'the name of your resource',
      })
      .option('attributes', {
        alias: 't',
        describe:
          'To specify fields of resource, you can use string, text, number, boolean and date ' +
          'fields',
        demandOption: true,
      }),
};
// eslint-disable-next-line no-unused-expressions
require('yargs')
  .usage('Usage: $0 <command> [options]')
  .demandCommand(1, 'You need at least one command before moving on')
  .command('new [name]', 'Generate a new project', newCommand)
  .command('resource <name>', 'Generate a new resource', resourceCommand)
  .example('$0 new your-project-name', 'To create a new project with fastexpress')
  .help('help')
  .alias('help', 'h').argv;
