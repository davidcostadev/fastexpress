const kebabcase = require('lodash.kebabcase');
const snakecase = require('lodash.snakecase');
const { mkdir, copyTemplate, destination, exec } = require('./utils');

const newHandler = async ({ name, template }) => {
  await mkdir(destination(name), { recursive: true });
  await mkdir(destination(`${name}/config`), { recursive: true });
  await mkdir(destination(`${name}/src`), { recursive: true });
  await mkdir(destination(`${name}/src/migrations`), { recursive: true });
  await mkdir(destination(`${name}/src/models`), { recursive: true });
  await mkdir(destination(`${name}/src/resources`), { recursive: true });
  await mkdir(destination(`${name}/src/seeders`), { recursive: true });

  await copyTemplate(`${template}/.sequelizerc`, `${name}/.sequelizerc`);
  await copyTemplate(`${template}/.gitignore`, `${name}/.gitignore`);
  await copyTemplate(`${template}/package.json.handlebars`, `${name}/package.json`, {
    name: kebabcase(name),
  });
  await copyTemplate(`${template}/README.md`, `${name}/README.md`, { name: kebabcase(name) });
  await copyTemplate(
    `${template}/config/example.database.json`,
    `${name}/config/example.database.json`,
    { name: snakecase(name) },
  );
  await copyTemplate(`${template}/src/models/index.js`, `${name}/src/models/index.js`);
  await copyTemplate(`${template}/src/routes.js`, `${name}/src/routes.js`);
  await copyTemplate(`${template}/src/server.js`, `${name}/src/server.js`);
  await exec(`git init ${name}`);
  await exec(`cd ${name} && git add -A && git commit -m "initial commit"`);

  // eslint-disable-next-line no-console
  console.log(`Generate completed
Run these commands to start
cd ./${name}
npm install or yarn
npm run dev`);
};

module.exports = newHandler;
