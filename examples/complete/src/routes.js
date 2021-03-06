const { Router } = require('express');
const {
  namespaceCreator,
  namespaceIndexCreator,
  resourceList,
  resources,
} = require('../../../src');
const Tasks = require('./controllers/Tasks');

const router = Router();

const namespace = namespaceCreator('/api/v1/');
const indexCreator = namespaceIndexCreator(namespace);

// root helper
router.get('/', (req, res) => {
  res.send(
    indexCreator({
      tasks: resourceList('tasks', { namespace }),
    }),
  );
});

// enpoints

resources(namespace('tasks'), { router, controller: Tasks });

module.exports = router;
