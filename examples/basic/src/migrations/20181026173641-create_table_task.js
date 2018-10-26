const { migrationActions } = require('fastexpress');

module.exports = {
  up: migrationActions.createTable('Tasks', Sequelize => ({
    name: {
      type: Sequelize.STRING,
    },
    completed: {
      type: Sequelize.BOOLEAN,
      default: false,
    },
  })),
  down: migrationActions.dropTable('Tasks'),
};
