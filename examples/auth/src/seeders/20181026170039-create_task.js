const bcrypt = require('bcrypt');

const BCRYPT_SALT = 8;

const returnID = value => (Array.isArray(value) ? value[0].id : value);

const insertor = bulkInsert => async (table, entity, options = { returning: true }) =>
  returnID(await bulkInsert(table, [entity], options));

module.exports = {
  up: async queryInterface => {
    const seed = insertor(queryInterface.bulkInsert.bind(queryInterface));

    const UserId = await seed('Users', {
      name: 'User Name',
      email: 'username@email.com',
      password: bcrypt.hashSync('P@ssw0rd', bcrypt.genSaltSync(BCRYPT_SALT)),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await queryInterface.bulkInsert('Tasks', [
      {
        UserId,
        name: 'First Task',
        completed: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId,
        completed: false,
        name: 'Second Task',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: queryInterface => {
    queryInterface.bulkDelete('Users');
  },
};
