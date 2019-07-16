const { Resources } = require('../../../src');
const Tasks = require('./endpoints/Tasks');

const Routers = new Resources({
  namespace: '/api/v1/',
})
  .add('tasks', Tasks)
  .getRouters();

module.exports = Routers;
