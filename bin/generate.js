/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const util = require('util');
const Handlebars = require('handlebars');

const mkdir = util.promisify(fs.mkdir);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const copyFile = util.promisify(fs.copyFile);

const generate = async ({ name, template }) => {
  const destination = (dir = '') => path.resolve('.', dir.length ? `${name}/${dir}` : `${name}`);

  const source = file => path.resolve(__dirname, `templates-source/${template}/${file}`);

  const copyTemplate = async (fileSource, params = {}) => {
    if (!Object.keys(params).length) {
      await copyFile(source(fileSource), destination(fileSource));
    } else {
      const content = await readFile(source(fileSource), 'utf8');

      const templateIt = Handlebars.compile(content);
      const compiled = templateIt(params);
      await writeFile(destination(fileSource), compiled);
    }
  };

  try {
    await mkdir(destination(), { recursive: true });
    await mkdir(destination('config'), { recursive: true });
    await mkdir(destination('src'), { recursive: true });
    await mkdir(destination('src/migrations'), { recursive: true });
    await mkdir(destination('src/models'), { recursive: true });
    await mkdir(destination('src/resources'), { recursive: true });
    await mkdir(destination('src/seeders'), { recursive: true });

    await copyTemplate('.sequelizerc');
    await copyTemplate('.gitignore');
    await copyTemplate('package.json');
    await copyTemplate('README.md');
    await copyTemplate('config/example.database.json');
    await copyTemplate('src/models/index.js');
    await copyTemplate('src/routes.js');
    await copyTemplate('src/server.js');

    console.log(`Generate completed
Run these commands to start
cd ./${name}
npm install or yarn
npm run dev`);
  } catch (error) {
    switch (error.errno) {
      case -17:
        console.error(error.message);
        break;

      default:
        console.error(error);
        break;
    }
  }
};

module.exports = generate;
