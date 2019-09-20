const { Resources } = require('fastexpress');

const routers = new Resources({
  namespace: '/api/v1/',
})
  // .add('name', Resource)
  .getRouters();

module.exports = routers;
