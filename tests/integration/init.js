const { execSync } = require('child_process');


const init = async () => {
  try {
    await execSync('cp ../../examples/basic/.sequelizerc .');
    await execSync('sed -i "s/ve(\'/ve(\'..\\\/..\\\/examples\\\/basic\\\//g" .sequelizerc');

    console.log('Creating database');
    await execSync('npx sequelize db:create');

    console.log('Migrating database');
    await execSync('npx sequelize db:migrate');

    console.log('Completed');
  } catch (error) {
    console.error(error);
  }
  await execSync('rm .sequelizerc');
};

init();
