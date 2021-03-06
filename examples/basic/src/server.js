const { server } = require('../../../src');
const routes = require('./routes');

server.use(routes);

const port = process.env.PORT || 3000;

server.listen(port);

module.exports = server;
