const { createMiddleware, Resources } = require('../../../src');
const Users = require('./endpoints/Users');
const Auth = require('./endpoints/Auth');
const Tasks = require('./endpoints/Tasks');

const middleware = createMiddleware('secretkey');

const routers = new Resources({
  namespace: '/api/v1/',
});

routers.add('tasks', Tasks, middleware);

routers.router.post(routers.namespace('login'), Auth.login);
routers.router.post(routers.namespace('register'), Users.create);

module.exports = routers.getRouters();
