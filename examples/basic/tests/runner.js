const cypress = require('cypress');
const server = require('../src/server');

return cypress.run()
  .then((results) => server.close());
