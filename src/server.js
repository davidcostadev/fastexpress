const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const use = (...args) => app.use(...args)

const listen = (port = 3000) => app.listen(port, () => {
  console.log(`Server is ready on port: ${port}`);
});

module.exports = {
  app,
  use,
  listen,
};
