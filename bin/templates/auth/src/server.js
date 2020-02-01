const { server } = require('fastexpress');
const routes = require('./routes');

server.use(routes);

const port = parseInt(process.env.PORT, 10) || 3000;

server.listen(port);

module.exports = server;
