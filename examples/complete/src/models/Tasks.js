module.exports = (sequelize, DataTypes) => {
  const Tasks = sequelize.define('Tasks', {
    name: DataTypes.STRING,
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {});
  Tasks.associate = () => {};
  return Tasks;
};
