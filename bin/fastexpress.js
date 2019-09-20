#!/usr/bin/env node
/* eslint-disable import/order */

const generateHandler = require('./generate');

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

require('yargs')
  .usage('Usage: $0 <command> [options]')
  .demandCommand(1, 'You need at least one command before moving on')
  .command('generate [name]', 'Generate a new project', generate)
  .example('$0 generate your-project-name', 'To create a new project with fastexpress')
  .help('help')
  .alias('help', 'h');
