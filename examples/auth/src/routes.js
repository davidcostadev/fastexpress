const { Router } = require('express');
const {
  namespaceCreator,
  namespaceIndexCreator,
  createMiddleware,
  resourceList,
  resourceWithAuth,
} = require('fastexpress');
const Tasks = require('./controllers/Tasks');
const Users = require('./controllers/Users');
const Auth = require('./controllers/Auth');

const router = Router();

const middleware = createMiddleware('secretkey');
const namespace = namespaceCreator('/api/v1/');
const indexCreator = namespaceIndexCreator(namespace);

// root helper
router.get('/', (req, res) => {
  res.send(indexCreator({
    tasks: resourceList('tasks', { namespace }),
    users: resourceList('users', { namespace }),
    auth: [
      `[post] ${namespace('login')}`,
      `[post] ${namespace('register')}`,
    ],
  }));
});

// enpoints

const options = { router, middleware, namespace };

resourceWithAuth('tasks', Tasks, options);
resourceWithAuth('Users', Users, options);

// custom

router.post(namespace('login'), Auth.login);
router.post(namespace('register'), Users.create);

module.exports = router;
