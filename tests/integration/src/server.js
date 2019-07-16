const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(routes);

const port = process.env.PORT || 3000;

module.exports = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`server on: ${port}`);
});
