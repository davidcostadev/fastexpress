const { migrationActions } = require('fastexpress');

module.exports = {
  up: migrationActions.createTable('Users', Sequelize => ({
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  })),
  down: migrationActions.dropTable('Users'),
};
