# fastexpress

[![Build Status](https://travis-ci.org/davidcostadev/fastexpress.svg?branch=master)](https://travis-ci.org/davidcostadev/fastexpress)
[![Maintainability](https://api.codeclimate.com/v1/badges/b045a34c8cb425bf67f1/maintainability)](https://codeclimate.com/github/withmoney/withmoney-api/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/b045a34c8cb425bf67f1/test_coverage)](https://codeclimate.com/github/withmoney/withmoney-api/test_coverage)
[![GitHub license](https://img.shields.io/github/license/davidcostadev/fastexpress.svg)](https://github.com/davidcostadev/fastexpress/blob/master/LICENSE)
[![npm version](https://img.shields.io/npm/v/fastexpress.svg)](https://www.npmjs.com/package/fastexpress)

---

fastexpress is a library to improve the development velocity of APIs with express. It's has a list of functionalities to create APIs with a little line of code, with possibility to customize it.

The main functionalities is:

- Improve the creation of model endpoints.
- Create CRUDs with few rows.
- Add rich integration with templates, allowed filters and joins.
- Add secure endpoints through token usage (jwt).

## Installation

`npm install --save fastexpress`

`yarn add fastexpress`


## Usage cases


### Service

The Service is a part of the system responsible for picking information from the models and delivering to the controllers.

The template is your sequelize template.

```javascript
const { createService, serviceDefaultProps, validate } = require('fastexpress');
const database = require('../models');

const { Tasks } = database;

const form = {
  name: {
    validation: validate.string,
  },
  completed: {
    validation: validate.bool,
  },
}

module.exports = createService(Tasks, serviceDefaultProps({
  database,
  form,
}));
```


### Controller 

The Controller make a communication between the model and the express

```javascript
const { createController } = require('fastexpress');
const TaskService = require('../services/TaskServices');

module.exports = createController(TaskService);
```


### Routes

Create CRUD endpoint to any controller

```javascript
const { Router } = require('express');
const { namespaceCreator, resources } = require('fastexpress');
const Tasks = require('./controllers/Tasks');

const router = Router();
const namespace = namespaceCreator('/api/v1/');

resources(namespace('tasks'), { router, controller: Tasks });

/**
  Endpoints
  [get] /api/v1/tasks
  [post] /api/v1/tasks
  [get] /api/v1/tasks/:id
  [delete] /api/v1/tasks/:id
  [put] /api/v1/tasks/:id'
*/

```

## Examples

### Basic

This is a basic example of usage of the fastexpress.

- [Basic](examples/basic)


## Open Source

If you have any question/bug/sugestion just create a new issue!

## Author

David Costa
