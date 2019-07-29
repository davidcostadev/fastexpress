# fastexpress

[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)
[![Build Status](https://travis-ci.org/davidcostadev/fastexpress.svg?branch=master)](https://travis-ci.org/davidcostadev/fastexpress)
[![CircleCI](https://circleci.com/gh/davidcostadev/fastexpress.svg?style=svg)](https://circleci.com/gh/davidcostadev/fastexpress)
[![Maintainability](https://api.codeclimate.com/v1/badges/b045a34c8cb425bf67f1/maintainability)](https://codeclimate.com/github/withmoney/withmoney-api/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/b045a34c8cb425bf67f1/test_coverage)](https://codeclimate.com/github/withmoney/withmoney-api/test_coverage)
[![GitHub license](https://img.shields.io/github/license/davidcostadev/fastexpress.svg)](https://github.com/davidcostadev/fastexpress/blob/master/LICENSE)
[![npm version](https://img.shields.io/npm/v/fastexpress.svg)](https://www.npmjs.com/package/fastexpress)
[![Open Source Helpers](https://www.codetriage.com/davidcostadev/fastexpress/badges/users.svg)](https://www.codetriage.com/davidcostadev/fastexpress)
---

fastexpress is a library designed to speed up the development of APIs with express. It's has a list of functionalities to create APIs with a small amount of lines of code, with possibility to customize it.

The main functionalities is:

- Improve the creation of model endpoints.
- Create CRUDs with few rows.
- Add rich integration with templates, allowing filters and joins.
- Add secure endpoints through token usage (jwt).

## Installation

`npm install --save fastexpress`

`yarn add fastexpress`


## Usage cases

### on service TaskService.js

The Service is the part of the system responsible for getting information from the models and delivering It to the controllers.

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


### On controler TasksController.js 

The Controller make a communication between the model and the express

```javascript
const { createController } = require('fastexpress');
const TaskService = require('../services/TaskService');

module.exports = createController(TaskService);
```


### on router.js

Create CRUD endpoint to any controller

```javascript
const { Router } = require('express');
const { namespaceCreator, resources } = require('fastexpress');
const Tasks = require('./controllers/TasksController');

const router = Router();
const namespace = namespaceCreator('/api/v1/');

resources(namespace('tasks'), { router, controller: Tasks });

/**
  Endpoints
  [get] /api/v1/tasks // to list tasks
  [post] /api/v1/tasks // to add a new task
  [get] /api/v1/tasks/:id // to get a one task
  [delete] /api/v1/tasks/:id // to delete a task
  [put] /api/v1/tasks/:id // to edit a task
*/

module.exports = router;

```

## On server.js

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(routes);

module.exports = app.listen(3000);

```

## Examples

### Basic

This is a basic example of usage of the fastexpress.

- [Basic](examples/basic)


## Fastexpress development

The tests use mysql, it need to use it.

With docker: `docker run --name fastexpress-mysql -e MYSQL_ROOT_PASSWORD=123 -p 3306:3306 -d mysql:5`

`yarn run pre-test`

`yarn run jest` or `yarn run test`

## Open Source

If you have any question/bug/sugestion just create a new issue!

## Author

David Costa
