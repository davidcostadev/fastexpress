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

- `npm install --global fastexpress`
- `fastexpress new [your-project-name]`
- `cd your-project-name`
- `npm install` or `yarn`
- `cp config/example.database.json config/database.json`
- `npm run sequelize db:create`

## Generate a resource

On root of your project

- `fastexpress resource [resourceName] --attributes name:string check:boolean age:number`
- `npm run sequelize db:migrate`
- `npm run sequelize db:seed:all` # __(optional)__


After that, you just need import and add the resource on Router. Like this on **src/routers.js** file:

```javascript
const { Resources } = require('fastexpress');
const [ResourceName] = require('./resources/[ResourceName]');

const routers = new Resources({
  namespace: '/api/v1/',
})
  .add('[resourceName]', [ResourceName])
  .getRouters();
```

### Development

- `npm run dev`


#### Basic Endpoints

- `[get]` /api
- `[get]` /api/v1

#### Resources

- `[get]` /api/v1/[resourceName] - to list resource 
- `[post]` /api/v1/[resourceName] - to add a new entity
- `[get]` /api/v1/[resourceName]/:id - to get a one entity
- `[delete]` /api/v1/[resourceName]/:id - to delete a entity
- `[put]` /api/v1/[resourceName]/:id - to edit a entity


## Examples

### Basic

This is a basic example of usage of the fastexpress.

- [Basic](examples/basic)
- [Auth](examples/auth)
- [Complete](examples/complete)

## fastexpress development

The tests use mysql, it need to use it.

With docker: `docker run --name fastexpress-mysql -e MYSQL_ROOT_PASSWORD=123 -p 3306:3306 -d mysql:5`

`npm run pre-test`

`npm run jest` or `npm run test`

## Open Source

If you have any question/bug/suggestion just create a new issue!

## Author

- [David Costa](https://github.com/davidcostadev)
