const { migrationActions } = require('fastexpress');

module.exports = {
  up: migrationActions.createTable('Tasks', Sequelize => ({
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    completed: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    UserId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  }), async (queryInterface) => {
    await migrationActions.addConstraint(queryInterface, 'Tasks', {
      field: 'UserId',
      name: 'fk_user_tasks',
      tableName: 'Users',
    });
  }),
  down: migrationActions.dropTable('Tasks'),
};
