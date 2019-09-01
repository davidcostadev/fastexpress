const { Resources } = require('../../../src');
const Tasks = require('./resources/Tasks');

const routers = new Resources({
  namespace: '/api/v1/',
})
  .add('tasks', Tasks)
  .getRouters();

module.exports = routers;
