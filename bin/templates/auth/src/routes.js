const { Resources, createMiddleware } = require('fastexpress');
const dotenv = require('dotenv');
const Users = require('./resources/Users');
const Auth = require('./resources/Auth');
// const Resource = require('./resources/Resource');

dotenv.config();

const middleware = createMiddleware(process.env.SECRET_KEY);

const routers = new Resources({
  namespace: '/api/v1/',
});

routers.add('users', Users, { middleware, only: ['get', 'update'] });
// routers.add('name', Resource, middleware);

routers.router.post(routers.namespace('signin'), Auth.login);
routers.router.post(routers.namespace('signup'), Users.create);

module.exports = routers.getRouters();
