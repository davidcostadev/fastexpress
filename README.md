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


## Dependencies

- `npm install --save sequelize`
- `yarn add sequelize`


## Installation

- `npm install --save fastexpress`
- `yarn add fastexpress`

## Usage cases

### Structure Recommended

```
config/database.json
src/resources/{Name}.js
src/models/{Name}.js
src/migrations/...
src/seeders/...
src/routers.js
src/server.js
.sequelizerc
```

### on .sequelierc

```javascript
const path = require('path');

module.exports = {
  config: path.resolve('config', 'database.json'),
  'models-path': path.resolve('src', 'models'),
  'seeders-path': path.resolve('src', 'seeders'),
  'migrations-path': path.resolve('src', 'migrations'),
};
```

### on src/resources/Tasks.js

```javascript
const { endpoint, validate } = require('fastexpress');
const database = require('../models');

const { Tasks: Model } = database;

module.exports = endpoint(
  Model,
  {
    name: {
      validation: validate.string,
    },
    completed: {
      validation: validate.bool,
    },
  },
  database,
);
```

### on src/models/index.js

```javascript
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const configs = require('../../config/database.json');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

const config = configs[env];
const db = {};
let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
```

### on src/models/Tasks.js

```javascript
module.exports = (sequelize, DataTypes) => {
  const Tasks = sequelize.define(
    'Tasks',
    {
      name: DataTypes.STRING,
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {},
  );
  Tasks.associate = () => {};
  return Tasks;
};
```

### on src/resources/Tasks.js

```javascript
const { endpoint, validate } = require('fastexpress');
const database = require('../models');

const { Tasks: Model } = database;

module.exports = endpoint(
  Model,
  {
    name: {
      validation: validate.string,
    },
    completed: {
      validation: validate.bool,
    },
  },
  database,
);
```

### on routers.js

Create CRUD endpoint to any controller

```javascript
const { Resources } = require('fastexpress');
const Tasks = require('./resources/Tasks');

const routers = new Resources({
  namespace: '/api/v1/',
})
  .add('tasks', Tasks)
  .getRouters();

module.exports = routers;
```

#### Basic Endpoints

- `[get]` /api
- `[get]` /api/v1

#### Resources

- `[get]` /api/v1/tasks - to list tasks
- `[post]` /api/v1/tasks - to add a new task
- `[get]` /api/v1/tasks/:id - to get a one task
- `[delete]` /api/v1/tasks/:id - to delete a task
- `[put]` /api/v1/tasks/:id - to edit a task

## On server.js

```javascript
const { server } = require('fastexpress');
const routes = require('./routes');

server.use(routes);

const port = process.env.PORT || 3000;

server.listen(port);

module.exports = server;
```

## Examples

### Basic

This is a basic example of usage of the fastexpress.

- [Basic](examples/basic)
- [Auth](examples/auth)
- [Complete](examples/complete)

## fastexpress development

The tests use mysql, it need to use it.

With docker: `docker run --name fastexpress-mysql -e MYSQL_ROOT_PASSWORD=123 -p 3306:3306 -d mysql:5`

`yarn run pre-test`

`yarn run jest` or `yarn run test`

## Open Source

If you have any question/bug/suggestion just create a new issue!

## Author

- [David Costa](https://github.com/davidcostadev)
