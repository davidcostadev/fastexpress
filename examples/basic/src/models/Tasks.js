module.exports = (sequelize, DataTypes) => {
  const Tasks = sequelize.define('Tasks', {
    name: DataTypes.STRING,
    completed: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
  }, {});
  Tasks.associate = () => {};
  return Tasks;
};
