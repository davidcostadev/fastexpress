const path = require('path');
const Handlebars = require('handlebars');
const { mkdir, copyFile, readFile, writeFile } = require('./utils');

const newHandler = async ({ name, template }) => {
  const destination = (dir = '') => path.resolve('.', dir.length ? `${name}/${dir}` : `${name}`);

  const source = file => path.resolve(__dirname, `templates/${template}/${file}`);

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

  await mkdir(destination(), { recursive: true });
  await mkdir(destination('config'), { recursive: true });
  await mkdir(destination('src'), { recursive: true });
  await mkdir(destination('src/migrations'), { recursive: true });
  await mkdir(destination('src/models'), { recursive: true });
  await mkdir(destination('src/resources'), { recursive: true });
  await mkdir(destination('src/seeders'), { recursive: true });

  await copyTemplate('.sequelizerc');
  await writeFile(destination('.gitignore'), 'node_modules\n');
  await copyTemplate('package.json');
  await copyTemplate('README.md');
  await copyTemplate('config/example.database.json');
  await copyTemplate('src/models/index.js');
  await copyTemplate('src/routes.js');
  await copyTemplate('src/server.js');

  // eslint-disable-next-line no-console
  console.log(`Generate completed
Run these commands to start
cd ./${name}
git init
npm install or yarn
npm run dev`);
};

module.exports = newHandler;
